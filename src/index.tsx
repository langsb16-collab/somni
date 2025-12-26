import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// ==================== API Routes ====================

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ==================== Questionnaires API ====================

// Get all questionnaires
app.get('/api/questionnaires', async (c) => {
  try {
    const { DB } = c.env
    const { results } = await DB.prepare('SELECT * FROM questionnaires').all()
    return c.json({ questionnaires: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch questionnaires' }, 500)
  }
})

// Get questionnaire by type
app.get('/api/questionnaires/:type', async (c) => {
  try {
    const { DB } = c.env
    const type = c.req.param('type')
    const result = await DB.prepare('SELECT * FROM questionnaires WHERE type = ?')
      .bind(type)
      .first()
    
    if (!result) {
      return c.json({ error: 'Questionnaire not found' }, 404)
    }
    
    return c.json({ questionnaire: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch questionnaire' }, 500)
  }
})

// Submit questionnaire response
app.post('/api/questionnaires/:type/responses', async (c) => {
  try {
    const { DB } = c.env
    const type = c.req.param('type')
    const { user_id = 1, answers, score, email } = await c.req.json()
    
    // Get questionnaire
    const questionnaire = await DB.prepare('SELECT * FROM questionnaires WHERE type = ?')
      .bind(type)
      .first()
    
    if (!questionnaire) {
      return c.json({ error: 'Questionnaire not found' }, 404)
    }
    
    // Determine interpretation based on score
    let interpretation = ''
    if (type === 'ISI') {
      if (score <= 7) interpretation = '정상 범위'
      else if (score <= 14) interpretation = '경도 불면'
      else if (score <= 21) interpretation = '중등도 불면'
      else interpretation = '중증 불면 / 전문 상담 권장'
    }
    
    // Save response
    const result = await DB.prepare(`
      INSERT INTO questionnaire_responses (user_id, questionnaire_id, score, answers_json, interpretation)
      VALUES (?, ?, ?, ?, ?)
    `).bind(user_id, questionnaire.id, score, JSON.stringify(answers), interpretation).run()
    
    return c.json({ 
      success: true, 
      response_id: result.meta.last_row_id,
      score,
      interpretation 
    })
  } catch (error) {
    return c.json({ error: 'Failed to save response' }, 500)
  }
})

// ==================== Sleep Sessions API ====================

// Get sleep sessions for user
app.get('/api/sleep-sessions', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const from = c.req.query('from')
    const to = c.req.query('to')
    
    let query = 'SELECT * FROM sleep_sessions WHERE user_id = ?'
    const params = [user_id]
    
    if (from && to) {
      query += ' AND date BETWEEN ? AND ?'
      params.push(from, to)
    }
    
    query += ' ORDER BY date DESC LIMIT 30'
    
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ sessions: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch sleep sessions' }, 500)
  }
})

// Create sleep session
app.post('/api/sleep-sessions', async (c) => {
  try {
    const { DB } = c.env
    const { 
      user_id = 1, 
      date, 
      sleep_onset, 
      wake_time, 
      awakenings_count = 0,
      sleep_efficiency,
      sleep_quality,
      notes
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT INTO sleep_sessions (user_id, date, sleep_onset, wake_time, awakenings_count, sleep_efficiency, sleep_quality, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(user_id, date, sleep_onset, wake_time, awakenings_count, sleep_efficiency, sleep_quality, notes).run()
    
    return c.json({ 
      success: true, 
      session_id: result.meta.last_row_id
    })
  } catch (error) {
    return c.json({ error: 'Failed to create sleep session' }, 500)
  }
})

// ==================== Risk Scores API ====================

// Get today's risk score
app.get('/api/risk-score/today', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const today = new Date().toISOString().split('T')[0]
    
    const result = await DB.prepare(
      'SELECT * FROM risk_scores WHERE user_id = ? AND date = ?'
    ).bind(user_id, today).first()
    
    return c.json({ risk_score: result || null })
  } catch (error) {
    return c.json({ error: 'Failed to fetch risk score' }, 500)
  }
})

// Create risk score
app.post('/api/risk-score', async (c) => {
  try {
    const { DB } = c.env
    const {
      user_id = 1,
      date,
      score,
      screen_time,
      noise_level,
      light_level,
      caffeine_intake,
      details
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT INTO risk_scores (user_id, date, score, screen_time, noise_level, light_level, caffeine_intake, details_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(user_id, date, score, screen_time, noise_level, light_level, caffeine_intake, JSON.stringify(details || {})).run()
    
    return c.json({ 
      success: true, 
      risk_id: result.meta.last_row_id
    })
  } catch (error) {
    return c.json({ error: 'Failed to save risk score' }, 500)
  }
})

// ==================== Clinics API ====================

// Search clinics
app.get('/api/clinics', async (c) => {
  try {
    const { DB } = c.env
    const city = c.req.query('city')
    const type = c.req.query('type')
    
    let query = 'SELECT * FROM clinics WHERE 1=1'
    const params: any[] = []
    
    if (city) {
      query += ' AND city LIKE ?'
      params.push(`%${city}%`)
    }
    
    if (type) {
      query += ' AND type = ?'
      params.push(type)
    }
    
    query += ' ORDER BY name'
    
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ clinics: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch clinics' }, 500)
  }
})

// Get clinic by ID
app.get('/api/clinics/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    
    const result = await DB.prepare('SELECT * FROM clinics WHERE id = ?')
      .bind(id)
      .first()
    
    if (!result) {
      return c.json({ error: 'Clinic not found' }, 404)
    }
    
    return c.json({ clinic: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch clinic' }, 500)
  }
})

// ==================== CBT Programs API ====================

// Get all CBT programs
app.get('/api/cbt/programs', async (c) => {
  try {
    const { DB } = c.env
    const { results } = await DB.prepare(
      'SELECT * FROM cbt_programs WHERE is_active = 1'
    ).all()
    
    return c.json({ programs: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch programs' }, 500)
  }
})

// Get CBT modules for a program
app.get('/api/cbt/programs/:id/modules', async (c) => {
  try {
    const { DB } = c.env
    const program_id = c.req.param('id')
    
    const { results } = await DB.prepare(
      'SELECT * FROM cbt_modules WHERE program_id = ? ORDER BY order_index'
    ).bind(program_id).all()
    
    return c.json({ modules: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch modules' }, 500)
  }
})

// ==================== User Dashboard API ====================

// Get user dashboard data
app.get('/api/dashboard', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    
    // Get latest sleep session
    const latestSleep = await DB.prepare(
      'SELECT * FROM sleep_sessions WHERE user_id = ? ORDER BY date DESC LIMIT 1'
    ).bind(user_id).first()
    
    // Get latest ISI score
    const latestISI = await DB.prepare(`
      SELECT qr.*, q.type 
      FROM questionnaire_responses qr 
      JOIN questionnaires q ON qr.questionnaire_id = q.id 
      WHERE qr.user_id = ? AND q.type = 'ISI' 
      ORDER BY qr.created_at DESC LIMIT 1
    `).bind(user_id).first()
    
    // Get today's risk score
    const today = new Date().toISOString().split('T')[0]
    const riskScore = await DB.prepare(
      'SELECT * FROM risk_scores WHERE user_id = ? AND date = ?'
    ).bind(user_id, today).first()
    
    // Get current CBT progress
    const cbtProgress = await DB.prepare(
      'SELECT * FROM user_cbt_progress WHERE user_id = ? AND status = "active" LIMIT 1'
    ).bind(user_id).first()
    
    return c.json({
      latest_sleep: latestSleep,
      latest_isi: latestISI,
      risk_score: riskScore,
      cbt_progress: cbtProgress
    })
  } catch (error) {
    return c.json({ error: 'Failed to fetch dashboard data' }, 500)
  }
})

// ==================== Frontend Routes ====================

// Assessment page
app.get('/assessment', async (c) => {
  const html = await Bun.file('./public/static/assessment.html').text()
  return c.html(html)
})

// Clinics page
app.get('/clinics', async (c) => {
  try {
    const { DB } = c.env
    const { results } = await DB.prepare('SELECT * FROM clinics ORDER BY name').all()
    
    return c.html(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>병원 찾기 - SomniCare</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
          <style>
            .sleep-gradient { background: linear-gradient(135deg, #1f7ed6 0%, #1560a8 100%); }
            .clinic-card { transition: all 0.3s ease; }
            .clinic-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
          </style>
      </head>
      <body class="bg-gray-50">
          <header class="sleep-gradient text-white shadow-lg">
              <div class="max-w-7xl mx-auto px-4 py-4">
                  <div class="flex items-center justify-between">
                      <a href="/" class="flex items-center space-x-3">
                          <i class="fas fa-moon text-2xl"></i>
                          <h1 class="text-xl font-bold">SomniCare</h1>
                      </a>
                      <a href="/" class="text-sm hover:opacity-80"><i class="fas fa-home mr-1"></i>홈으로</a>
                  </div>
              </div>
          </header>

          <div class="max-w-7xl mx-auto px-4 py-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-6">
                  <i class="fas fa-hospital text-blue-600 mr-2"></i>
                  전국 수면클리닉 검색
              </h2>
              
              <div class="grid md:grid-cols-2 gap-6">
                  ${results.map((clinic: any) => `
                    <div class="bg-white rounded-xl p-6 shadow-md clinic-card">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">${clinic.name}</h3>
                                <p class="text-sm text-gray-600 mt-1">
                                    <i class="fas fa-map-marker-alt mr-1"></i>
                                    ${clinic.address || clinic.city}
                                </p>
                            </div>
                            ${clinic.has_polysomnography ? 
                              '<span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">수면다원검사</span>' 
                              : ''}
                        </div>
                        <div class="space-y-2 mt-4">
                            ${clinic.phone ? `
                              <p class="text-sm text-gray-700">
                                  <i class="fas fa-phone text-green-600 mr-2"></i>
                                  <a href="tel:${clinic.phone}" class="hover:text-blue-600">${clinic.phone}</a>
                              </p>
                            ` : ''}
                            ${clinic.url ? `
                              <p class="text-sm">
                                  <a href="${clinic.url}" target="_blank" class="text-blue-600 hover:text-blue-800">
                                      <i class="fas fa-external-link-alt mr-2"></i>
                                      웹사이트 방문
                                  </a>
                              </p>
                            ` : ''}
                        </div>
                    </div>
                  `).join('')}
              </div>
          </div>
      </body>
      </html>
    `)
  } catch (error) {
    return c.json({ error: 'Failed to load clinics page' }, 500)
  }
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SomniCare - 불면증 치료·케어 종합 관리 플랫폼</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          .sleep-gradient {
            background: linear-gradient(135deg, #1f7ed6 0%, #1560a8 100%);
          }
          .card-hover {
            transition: all 0.3s ease;
          }
          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          }
          .risk-low { background: linear-gradient(135deg, #10b981, #059669); }
          .risk-medium { background: linear-gradient(135deg, #f59e0b, #d97706); }
          .risk-high { background: linear-gradient(135deg, #ef4444, #dc2626); }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="sleep-gradient text-white shadow-lg">
            <div class="max-w-7xl mx-auto px-4 py-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-moon text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">SomniCare</h1>
                            <p class="text-sm opacity-90">불면증 치료·케어 종합 플랫폼</p>
                        </div>
                    </div>
                    <nav class="hidden md:flex space-x-6">
                        <a href="/" class="hover:opacity-80">홈</a>
                        <a href="/assessment" class="hover:opacity-80">자가진단</a>
                        <a href="/program" class="hover:opacity-80">프로그램</a>
                        <a href="/clinics" class="hover:opacity-80">병원찾기</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="sleep-gradient text-white py-16">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-4">
                    당신의 잠은 치료 받을 수 있습니다
                </h2>
                <p class="text-xl mb-8 opacity-90">
                    과학 기반 맞춤 수면 루틴 + 가족/보호자 케어 + 병원 연계까지 한 번에
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/assessment" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                        <i class="fas fa-clipboard-check mr-2"></i>
                        무료 불면증 검사 시작
                    </a>
                    <a href="/program" class="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition border-2 border-white">
                        <i class="fas fa-book-medical mr-2"></i>
                        프로그램 둘러보기
                    </a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
                    세상에 하나뿐인 차별화 기능
                </h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Feature 1 -->
                    <div class="bg-blue-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-chart-line text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">실시간 리스크 스코어</h3>
                        <p class="text-gray-600">
                            폰 센서 + 생활 행동 데이터로 불면 위험도를 실시간 분석
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="bg-green-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-brain text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">AI 맞춤 CBT-I</h3>
                        <p class="text-gray-600">
                            개인별 매일 업데이트되는 인지행동치료 프로토콜 자동 생성
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="bg-purple-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-users text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">가족 케어 모드</h3>
                        <p class="text-gray-600">
                            시니어/환자 방 야간 감지 + 보호자 앱 실시간 연동
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-orange-50 rounded-xl p-6 card-hover">
                        <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                            <i class="fas fa-hospital text-white text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-2 text-gray-800">병원 연계 시스템</h3>
                        <p class="text-gray-600">
                            전국 수면클리닉 검색 + 수면다원검사 가능 병원 매핑
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Actions -->
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
                    빠른 시작하기
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- ISI Test -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-file-medical text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">불면증 자가진단 (ISI)</h3>
                            <p class="text-gray-600 mb-6">3분이면 완료되는 과학적 검사</p>
                            <a href="/assessment?type=isi" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                                검사 시작 →
                            </a>
                        </div>
                    </div>

                    <!-- Sleep Log -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-bed text-green-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">수면일지 작성</h3>
                            <p class="text-gray-600 mb-6">어제 밤 수면 상태 기록하기</p>
                            <a href="/sleep-log" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                                일지 쓰기 →
                            </a>
                        </div>
                    </div>

                    <!-- Find Clinic -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-map-marked-alt text-orange-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2">병원 찾기</h3>
                            <p class="text-gray-600 mb-6">가까운 수면클리닉 검색</p>
                            <a href="/clinics" class="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition">
                                병원 찾기 →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Statistics -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div class="text-4xl font-bold text-blue-600 mb-2">30%</div>
                        <div class="text-gray-600">수면 점수 개선율</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-green-600 mb-2">6주</div>
                        <div class="text-gray-600">CBT-I 프로그램</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-purple-600 mb-2">100+</div>
                        <div class="text-gray-600">전국 수면클리닉</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                        <div class="text-gray-600">AI 코치 상담</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">SomniCare</h3>
                        <p class="text-gray-400">
                            불면증 치료·케어 종합 관리 플랫폼
                        </p>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">서비스</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/assessment" class="hover:text-white">자가진단</a></li>
                            <li><a href="/program" class="hover:text-white">CBT-I 프로그램</a></li>
                            <li><a href="/clinics" class="hover:text-white">병원 찾기</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">정보</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white">소개</a></li>
                            <li><a href="/privacy" class="hover:text-white">개인정보처리방침</a></li>
                            <li><a href="/terms" class="hover:text-white">이용약관</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">언어</h3>
                        <div class="flex gap-2">
                            <button class="px-3 py-1 bg-blue-600 rounded">한국어</button>
                            <button class="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">EN</button>
                            <button class="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">中文</button>
                        </div>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 SomniCare. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          // Load dashboard data
          async function loadDashboard() {
            try {
              const response = await axios.get('/api/dashboard?user_id=1');
              console.log('Dashboard data:', response.data);
            } catch (error) {
              console.error('Failed to load dashboard:', error);
            }
          }
          
          // Check API health
          async function checkHealth() {
            try {
              const response = await axios.get('/api/health');
              console.log('API Health:', response.data);
            } catch (error) {
              console.error('API health check failed:', error);
            }
          }
          
          // Initialize
          document.addEventListener('DOMContentLoaded', () => {
            checkHealth();
            loadDashboard();
          });
        </script>
    </body>
    </html>
  `)
})

export default app
