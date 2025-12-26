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
app.use('/static/*', serveStatic({ root: './' }))

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

// ==================== Wellness API ====================

// Get all music content
app.get('/api/wellness/music', async (c) => {
  try {
    const { DB } = c.env
    const category = c.req.query('category')
    let query = 'SELECT * FROM music_content WHERE 1=1'
    const params: any[] = []
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    
    query += ' ORDER BY play_count DESC, rating DESC'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ music: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch music content' }, 500)
  }
})

// Get music by ID
app.get('/api/wellness/music/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    const result = await DB.prepare('SELECT * FROM music_content WHERE id = ?').bind(id).first()
    if (!result) return c.json({ error: 'Music not found' }, 404)
    return c.json({ music: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch music' }, 500)
  }
})

// Get all yoga content
app.get('/api/wellness/yoga', async (c) => {
  try {
    const { DB } = c.env
    const category = c.req.query('category')
    const difficulty = c.req.query('difficulty')
    let query = 'SELECT * FROM yoga_content WHERE 1=1'
    const params: any[] = []
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    if (difficulty) {
      query += ' AND difficulty = ?'
      params.push(difficulty)
    }
    
    query += ' ORDER BY completion_count DESC, rating DESC'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ yoga: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch yoga content' }, 500)
  }
})

// Get yoga by ID
app.get('/api/wellness/yoga/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    const result = await DB.prepare('SELECT * FROM yoga_content WHERE id = ?').bind(id).first()
    if (!result) return c.json({ error: 'Yoga not found' }, 404)
    return c.json({ yoga: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch yoga' }, 500)
  }
})

// Get all breathing routines
app.get('/api/wellness/breathing', async (c) => {
  try {
    const { DB } = c.env
    const type = c.req.query('type')
    let query = 'SELECT * FROM breathing_routines WHERE 1=1'
    const params: any[] = []
    
    if (type) {
      query += ' AND type = ?'
      params.push(type)
    }
    
    query += ' ORDER BY completion_count DESC, rating DESC'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ breathing: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch breathing routines' }, 500)
  }
})

// Get breathing by ID
app.get('/api/wellness/breathing/:id', async (c) => {
  try {
    const { DB } = c.env
    const id = c.req.param('id')
    const result = await DB.prepare('SELECT * FROM breathing_routines WHERE id = ?').bind(id).first()
    if (!result) return c.json({ error: 'Breathing routine not found' }, 404)
    return c.json({ breathing: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch breathing routine' }, 500)
  }
})

// Get all ASMR content
app.get('/api/wellness/asmr', async (c) => {
  try {
    const { DB } = c.env
    const category = c.req.query('category')
    const binaural = c.req.query('binaural')
    let query = 'SELECT * FROM asmr_content WHERE 1=1'
    const params: any[] = []
    
    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }
    if (binaural === 'true') {
      query += ' AND is_binaural = 1'
    }
    
    query += ' ORDER BY play_count DESC, rating DESC'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ asmr: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch ASMR content' }, 500)
  }
})

// Record wellness activity
app.post('/api/wellness/activity', async (c) => {
  try {
    const { DB } = c.env
    const {
      user_id = 1,
      activity_type,
      content_id,
      content_title,
      duration_seconds,
      completed = false,
      rating,
      feedback
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT INTO wellness_activities (user_id, activity_type, content_id, content_title, duration_seconds, completed, rating, feedback)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(user_id, activity_type, content_id, content_title, duration_seconds, completed ? 1 : 0, rating, feedback).run()
    
    return c.json({ success: true, activity_id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Failed to record activity' }, 500)
  }
})

// Get user wellness activities
app.get('/api/wellness/activities', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const activity_type = c.req.query('type')
    
    let query = 'SELECT * FROM wellness_activities WHERE user_id = ?'
    const params: any[] = [user_id]
    
    if (activity_type) {
      query += ' AND activity_type = ?'
      params.push(activity_type)
    }
    
    query += ' ORDER BY created_at DESC LIMIT 50'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ activities: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch activities' }, 500)
  }
})

// Get/Update user wellness preferences
app.get('/api/wellness/preferences', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const result = await DB.prepare(
      'SELECT * FROM user_wellness_preferences WHERE user_id = ?'
    ).bind(user_id).first()
    return c.json({ preferences: result })
  } catch (error) {
    return c.json({ error: 'Failed to fetch preferences' }, 500)
  }
})

app.post('/api/wellness/preferences', async (c) => {
  try {
    const { DB } = c.env
    const {
      user_id = 1,
      preferred_music_categories,
      preferred_yoga_categories,
      preferred_breathing_types,
      preferred_asmr_categories,
      night_mode_enabled = true,
      auto_recommend_enabled = true,
      accessibility_mode = false
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT OR REPLACE INTO user_wellness_preferences 
      (user_id, preferred_music_categories, preferred_yoga_categories, preferred_breathing_types, 
       preferred_asmr_categories, night_mode_enabled, auto_recommend_enabled, accessibility_mode, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      user_id,
      JSON.stringify(preferred_music_categories || []),
      JSON.stringify(preferred_yoga_categories || []),
      JSON.stringify(preferred_breathing_types || []),
      JSON.stringify(preferred_asmr_categories || []),
      night_mode_enabled ? 1 : 0,
      auto_recommend_enabled ? 1 : 0,
      accessibility_mode ? 1 : 0
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    return c.json({ error: 'Failed to save preferences' }, 500)
  }
})

// ==================== Caring Mode API ====================

// Get care links for user (as patient or caregiver)
app.get('/api/care/links', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const role = c.req.query('role') || 'all' // 'patient', 'caregiver', 'all'
    
    let query = 'SELECT * FROM care_links WHERE status = "active" AND ('
    const params: any[] = []
    
    if (role === 'patient') {
      query += 'patient_id = ?)'
      params.push(user_id)
    } else if (role === 'caregiver') {
      query += 'caregiver_id = ?)'
      params.push(user_id)
    } else {
      query += 'patient_id = ? OR caregiver_id = ?)'
      params.push(user_id, user_id)
    }
    
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ care_links: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch care links' }, 500)
  }
})

// Create QR invite token
app.post('/api/care/invite', async (c) => {
  try {
    const { DB } = c.env
    const { user_id = 1, permissions } = await c.req.json()
    
    // Generate unique token
    const token = crypto.randomUUID()
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
    
    const result = await DB.prepare(`
      INSERT INTO care_invites (patient_id, token, permissions_json, expires_at)
      VALUES (?, ?, ?, ?)
    `).bind(user_id, token, JSON.stringify(permissions), expires_at).run()
    
    return c.json({ 
      success: true, 
      invite_id: result.meta.last_row_id,
      token,
      expires_at
    })
  } catch (error) {
    return c.json({ error: 'Failed to create invite' }, 500)
  }
})

// Accept care invite (caregiver scans QR)
app.post('/api/care/accept', async (c) => {
  try {
    const { DB } = c.env
    const { token, caregiver_id = 1, relationship = 'family' } = await c.req.json()
    
    // Get invite
    const invite = await DB.prepare(
      'SELECT * FROM care_invites WHERE token = ? AND status = "pending"'
    ).bind(token).first()
    
    if (!invite) {
      return c.json({ error: 'Invalid or expired invite' }, 404)
    }
    
    // Check expiration
    if (new Date(invite.expires_at) < new Date()) {
      await DB.prepare('UPDATE care_invites SET status = "expired" WHERE id = ?').bind(invite.id).run()
      return c.json({ error: 'Invite has expired' }, 400)
    }
    
    // Create care link
    const linkResult = await DB.prepare(`
      INSERT INTO care_links (patient_id, caregiver_id, relationship, permissions_json)
      VALUES (?, ?, ?, ?)
    `).bind(invite.patient_id, caregiver_id, relationship, invite.permissions_json).run()
    
    // Mark invite as used
    await DB.prepare(`
      UPDATE care_invites SET status = "used", used_at = CURRENT_TIMESTAMP, used_by_user_id = ? 
      WHERE id = ?
    `).bind(caregiver_id, invite.id).run()
    
    return c.json({ 
      success: true, 
      care_link_id: linkResult.meta.last_row_id
    })
  } catch (error) {
    return c.json({ error: 'Failed to accept invite' }, 500)
  }
})

// Get care alerts for caregiver
app.get('/api/care/alerts', async (c) => {
  try {
    const { DB } = c.env
    const caregiver_id = c.req.query('caregiver_id') || '1'
    const unread_only = c.req.query('unread_only') === 'true'
    
    let query = 'SELECT * FROM care_alerts WHERE caregiver_id = ?'
    const params: any[] = [caregiver_id]
    
    if (unread_only) {
      query += ' AND read_at IS NULL'
    }
    
    query += ' ORDER BY created_at DESC LIMIT 50'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ alerts: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch alerts' }, 500)
  }
})

// ==================== Medication Management API ====================

// Get user medications
app.get('/api/medications', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const active_only = c.req.query('active_only') === 'true'
    
    let query = 'SELECT * FROM medications WHERE user_id = ?'
    const params: any[] = [user_id]
    
    if (active_only) {
      query += ' AND is_active = 1'
    }
    
    query += ' ORDER BY created_at DESC'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ medications: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch medications' }, 500)
  }
})

// Add medication
app.post('/api/medications', async (c) => {
  try {
    const { DB } = c.env
    const {
      user_id = 1,
      name,
      dosage,
      frequency,
      prescribed_by,
      start_date,
      end_date,
      notes
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT INTO medications (user_id, name, dosage, frequency, prescribed_by, start_date, end_date, notes, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).bind(user_id, name, dosage, frequency, prescribed_by, start_date, end_date, notes).run()
    
    return c.json({ success: true, medication_id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Failed to add medication' }, 500)
  }
})

// Log medication intake
app.post('/api/medications/log', async (c) => {
  try {
    const { DB } = c.env
    const {
      medication_id,
      user_id = 1,
      taken,
      taken_at,
      scheduled_at,
      notes
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT INTO medication_logs (medication_id, user_id, taken, taken_at, scheduled_at, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(medication_id, user_id, taken ? 1 : 0, taken_at, scheduled_at, notes).run()
    
    return c.json({ success: true, log_id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Failed to log medication' }, 500)
  }
})

// Get medication logs
app.get('/api/medications/:id/logs', async (c) => {
  try {
    const { DB } = c.env
    const medication_id = c.req.param('id')
    const days = parseInt(c.req.query('days') || '7')
    
    const { results } = await DB.prepare(`
      SELECT * FROM medication_logs 
      WHERE medication_id = ? 
      AND date(scheduled_at) >= date('now', '-' || ? || ' days')
      ORDER BY scheduled_at DESC
    `).bind(medication_id, days).all()
    
    return c.json({ logs: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch logs' }, 500)
  }
})

// Get caregiver view of patient medications (with permission check)
app.get('/api/care/patients/:id/medications', async (c) => {
  try {
    const { DB } = c.env
    const patient_id = c.req.param('id')
    const caregiver_id = c.req.query('caregiver_id') || '1'
    
    // Check care link and permissions
    const careLink = await DB.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(patient_id, caregiver_id).first()
    
    if (!careLink) {
      return c.json({ error: 'No active care link found' }, 403)
    }
    
    // Check shareMedication permission
    const permissions = JSON.parse(careLink.permissions_json)
    if (!permissions.shareMedication) {
      return c.json({ error: 'No permission to view medications' }, 403)
    }
    
    // Get medications and recent logs
    const { results: medications } = await DB.prepare(`
      SELECT * FROM medications WHERE user_id = ? AND is_active = 1
    `).bind(patient_id).all()
    
    const medicationsWithLogs = await Promise.all(
      medications.map(async (med: any) => {
        const { results: logs } = await DB.prepare(`
          SELECT * FROM medication_logs 
          WHERE medication_id = ? 
          AND date(scheduled_at) >= date('now', '-7 days')
          ORDER BY scheduled_at DESC
        `).bind(med.id).all()
        
        return { ...med, recent_logs: logs }
      })
    )
    
    return c.json({ medications: medicationsWithLogs })
  } catch (error) {
    return c.json({ error: 'Failed to fetch patient medications' }, 500)
  }
})

// ==================== Care Notes API ====================

// Create care note
app.post('/api/care/notes', async (c) => {
  try {
    const { DB } = c.env
    const {
      care_link_id,
      user_id = 1,
      author_role,
      note_type = 'general',
      content,
      flag = 'normal',
      is_shared = false
    } = await c.req.json()
    
    const result = await DB.prepare(`
      INSERT INTO care_notes (care_link_id, user_id, author_role, note_type, content, flag, is_shared)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(care_link_id, user_id, author_role, note_type, content, flag, is_shared ? 1 : 0).run()
    
    // If flag is 'urgent' and is_shared, trigger alert logic here
    // (For now, just return success)
    
    return c.json({ success: true, note_id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Failed to create note' }, 500)
  }
})

// Get care notes
app.get('/api/care/notes', async (c) => {
  try {
    const { DB } = c.env
    const user_id = c.req.query('user_id') || '1'
    const care_link_id = c.req.query('care_link_id')
    const flag = c.req.query('flag')
    
    let query = 'SELECT * FROM care_notes WHERE 1=1'
    const params: any[] = []
    
    if (user_id) {
      query += ' AND user_id = ?'
      params.push(user_id)
    }
    
    if (care_link_id) {
      query += ' AND care_link_id = ?'
      params.push(care_link_id)
    }
    
    if (flag) {
      query += ' AND flag = ?'
      params.push(flag)
    }
    
    query += ' ORDER BY created_at DESC LIMIT 50'
    const { results } = await DB.prepare(query).bind(...params).all()
    return c.json({ notes: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch notes' }, 500)
  }
})

// Get patient notes for caregiver
app.get('/api/care/patients/:id/notes', async (c) => {
  try {
    const { DB } = c.env
    const patient_id = c.req.param('id')
    const caregiver_id = c.req.query('caregiver_id') || '1'
    
    // Check care link
    const careLink = await DB.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(patient_id, caregiver_id).first()
    
    if (!careLink) {
      return c.json({ error: 'No active care link found' }, 403)
    }
    
    // Get notes for this care link
    const { results } = await DB.prepare(`
      SELECT * FROM care_notes 
      WHERE (care_link_id = ? OR (user_id = ? AND is_shared = 1))
      ORDER BY created_at DESC LIMIT 50
    `).bind(careLink.id, patient_id).all()
    
    return c.json({ notes: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch patient notes' }, 500)
  }
})

// Medical provider view of patient notes (requires clinician role)
app.get('/api/md/patients/:id/notes', async (c) => {
  try {
    const { DB } = c.env
    const patient_id = c.req.param('id')
    
    // In production, check for clinician role here
    // For now, return shared notes only
    
    const { results } = await DB.prepare(`
      SELECT * FROM care_notes 
      WHERE user_id = ? AND is_shared = 1
      ORDER BY created_at DESC
    `).bind(patient_id).all()
    
    return c.json({ notes: results })
  } catch (error) {
    return c.json({ error: 'Failed to fetch patient notes' }, 500)
  }
})

// ==================== Patient Summary API (for Caregivers) ====================

// Get patient sleep summary
app.get('/api/care/patients/:id/summary', async (c) => {
  try {
    const { DB } = c.env
    const patient_id = c.req.param('id')
    const caregiver_id = c.req.query('caregiver_id') || '1'
    
    // Check care link
    const careLink = await DB.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(patient_id, caregiver_id).first()
    
    if (!careLink) {
      return c.json({ error: 'No active care link found' }, 403)
    }
    
    const permissions = JSON.parse(careLink.permissions_json)
    
    // Get latest sleep session
    const latestSleep = await DB.prepare(`
      SELECT * FROM sleep_sessions 
      WHERE user_id = ? 
      ORDER BY date DESC LIMIT 1
    `).bind(patient_id).first()
    
    // Calculate sleep score (simplified)
    const sleepScore = latestSleep ? Math.round(latestSleep.sleep_efficiency || 70) : null
    
    // Get today's risk score
    const riskScore = await DB.prepare(`
      SELECT * FROM risk_scores 
      WHERE user_id = ? AND date = date('now')
    `).bind(patient_id).first()
    
    // Build summary based on permissions
    const summary: any = {
      date: new Date().toISOString().split('T')[0],
      patient_id: patient_id
    }
    
    if (permissions.shareScore) {
      summary.sleepScore = sleepScore
      summary.awakenings = latestSleep?.awakenings_count || 0
    }
    
    if (permissions.shareRoutine) {
      summary.routineCompleted = true // Simplified
    }
    
    if (permissions.shareRisk) {
      summary.riskLevel = latestSleep?.risk_level || 'green'
    }
    
    return c.json({ success: true, data: summary })
  } catch (error) {
    return c.json({ error: 'Failed to fetch summary' }, 500)
  }
})

// Get patient sleep history
app.get('/api/care/patients/:id/history', async (c) => {
  try {
    const { DB } = c.env
    const patient_id = c.req.param('id')
    const caregiver_id = c.req.query('caregiver_id') || '1'
    const days = parseInt(c.req.query('days') || '7')
    
    // Check care link
    const careLink = await DB.prepare(`
      SELECT * FROM care_links 
      WHERE patient_id = ? AND caregiver_id = ? AND status = 'active'
    `).bind(patient_id, caregiver_id).first()
    
    if (!careLink) {
      return c.json({ error: 'No active care link found' }, 403)
    }
    
    const permissions = JSON.parse(careLink.permissions_json)
    
    if (!permissions.shareScore && !permissions.shareRisk) {
      return c.json({ error: 'No permission to view history' }, 403)
    }
    
    // Get sleep history
    const { results } = await DB.prepare(`
      SELECT date, sleep_efficiency, awakenings_count, sleep_quality, risk_level
      FROM sleep_sessions 
      WHERE user_id = ? 
      AND date >= date('now', '-' || ? || ' days')
      ORDER BY date DESC
    `).bind(patient_id, days).all()
    
    // Filter based on permissions
    const history = results.map((record: any) => {
      const entry: any = { date: record.date }
      
      if (permissions.shareScore) {
        entry.sleepScore = Math.round(record.sleep_efficiency || 70)
      }
      
      if (permissions.shareRisk) {
        entry.risk = record.risk_level || 'green'
      }
      
      return entry
    })
    
    return c.json({ success: true, data: history })
  } catch (error) {
    return c.json({ error: 'Failed to fetch history' }, 500)
  }
})

// ==================== Frontend Routes ====================

// Wellness Hub
app.get('/wellness', (c) => {
  return c.redirect('/static/wellness.html')
})

// Music Player
app.get('/wellness/music', (c) => {
  return c.redirect('/static/music.html')
})

// Assessment page
app.get('/assessment', (c) => {
  return c.redirect('/static/assessment.html')
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
          
          /* Mobile optimizations */
          .text-truncate-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.4;
          }
          
          /* Language dropdown */
          .lang-dropdown {
            position: relative;
            display: inline-block;
          }
          .lang-dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            background-color: white;
            min-width: 120px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            border-radius: 8px;
            z-index: 1000;
            overflow: hidden;
          }
          .lang-dropdown:hover .lang-dropdown-content {
            display: block;
          }
          .lang-dropdown-content button {
            color: #1f2937;
            padding: 10px 16px;
            text-decoration: none;
            display: block;
            width: 100%;
            text-align: left;
            border: none;
            background: white;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          }
          .lang-dropdown-content button:hover {
            background-color: #f3f4f6;
          }
          .lang-dropdown-content button.active {
            background-color: #1f7ed6;
            color: white;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Load Translations -->
        <script src="/static/translations.js"></script>
        
        <!-- Header -->
        <header class="sleep-gradient text-white shadow-lg">
            <div class="max-w-7xl mx-auto px-3 py-2 md:py-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-moon text-lg md:text-xl"></i>
                        <div>
                            <h1 class="text-base md:text-lg font-bold" id="siteName">SomniCare</h1>
                            <p class="text-xs opacity-90 hidden sm:block" id="siteTagline">불면증 치료·케어 플랫폼</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 md:gap-4">
                        <nav class="hidden md:flex space-x-4 text-sm">
                            <a href="/" class="hover:opacity-80" id="menuHome">홈</a>
                            <a href="/wellness" class="hover:opacity-80" id="menuWellness">웰니스</a>
                            <a href="/assessment" class="hover:opacity-80" id="menuAssessment">자가진단</a>
                            <a href="/program" class="hover:opacity-80" id="menuProgram">프로그램</a>
                            <a href="/clinics" class="hover:opacity-80" id="menuClinics">병원찾기</a>
                        </nav>
                        <div class="lang-dropdown">
                            <button class="px-2 py-1 bg-white bg-opacity-20 rounded-lg text-xs md:text-sm font-semibold hover:bg-opacity-30 transition flex items-center gap-1">
                                <i class="fas fa-globe"></i>
                                <span class="hidden sm:inline" id="currentLangText">한국어</span>
                                <i class="fas fa-chevron-down text-xs"></i>
                            </button>
                            <div class="lang-dropdown-content">
                                <button onclick="setLanguage('ko')">🇰🇷 한국어</button>
                                <button onclick="setLanguage('en')">🇺🇸 English</button>
                                <button onclick="setLanguage('zh')">🇨🇳 中文</button>
                                <button onclick="setLanguage('ja')">🇯🇵 日本語</button>
                                <button onclick="setLanguage('es')">🇪🇸 Español</button>
                                <button onclick="setLanguage('fr')">🇫🇷 Français</button>
                                <button onclick="setLanguage('de')">🇩🇪 Deutsch</button>
                                <button onclick="setLanguage('vi')">🇻🇳 Tiếng Việt</button>
                                <button onclick="setLanguage('th')">🇹🇭 ไทย</button>
                                <button onclick="setLanguage('id')">🇮🇩 Bahasa Indonesia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="sleep-gradient text-white py-5 md:py-10">
            <div class="max-w-7xl mx-auto px-3 text-center">
                <h2 class="text-lg md:text-3xl font-bold mb-2 leading-tight" id="heroTitle">
                    당신의 잠은 치료 받을 수 있습니다
                </h2>
                <p class="text-xs md:text-base mb-4 opacity-90 leading-tight" id="heroSubtitle">
                    과학적 맞춤 수면루틴 + 가족/보호자 케어 + 병원 연계까지
                </p>
                <div class="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
                    <a href="/assessment" class="bg-white text-blue-600 px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm hover:bg-gray-100 transition">
                        <i class="fas fa-clipboard-check mr-1"></i>
                        <span id="btnFreeTest">무료 불면증 검사</span>
                    </a>
                    <a href="/program" class="bg-blue-800 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm hover:bg-blue-900 transition border-2 border-white">
                        <i class="fas fa-book-medical mr-1"></i>
                        <span id="btnViewProgram">프로그램 보기</span>
                    </a>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-8 md:py-12 bg-white">
            <div class="max-w-7xl mx-auto px-3">
                <h2 class="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800" id="featuresTitle">
                    세상에 하나뿐인 차별화 기능
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    <!-- Feature 1 -->
                    <div class="bg-blue-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-chart-line text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureRiskScore">리스크 스코어</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureRiskDesc">
                            폰 센서+생활 데이터로 불면 위험도 분석
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="bg-green-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-brain text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureAI">AI 맞춤 CBT-I</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureAIDesc">
                            개인별 매일 업데이트 인지행동치료
                        </p>
                    </div>

                    <!-- Feature 3 - NEW Wellness -->
                    <div class="bg-purple-50 rounded-lg p-3 md:p-4 card-hover cursor-pointer" onclick="window.location.href='/wellness'">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-spa text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureWellness">웰니스 콘텐츠</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureWellnessDesc">
                            음악·요가·호흡·ASMR 힐링 콘텐츠
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-pink-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-pink-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-users text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureCare">가족 케어 모드</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureCareDesc">
                            야간 감지+보호자 실시간 연동
                        </p>
                    </div>

                    <!-- Feature 5 -->
                    <div class="bg-orange-50 rounded-lg p-3 md:p-4 card-hover">
                        <div class="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-2">
                            <i class="fas fa-hospital text-white text-sm md:text-base"></i>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold mb-1 text-gray-800" id="featureHospital">병원 연계</h3>
                        <p class="text-xs text-gray-600 text-truncate-2" id="featureHospitalDesc">
                            전국 수면클리닉+수면다원검사 병원
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quick Actions -->
        <section class="py-16 bg-gray-100">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-3xl font-bold text-center mb-12 text-gray-800" id="quickTitle">
                    빠른 시작하기
                </h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- ISI Test -->
                    <div class="bg-white rounded-xl p-8 shadow-md card-hover">
                        <div class="text-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-file-medical text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold mb-2" id="quickISI">불면증 자가진단 (ISI)</h3>
                            <p class="text-gray-600 mb-6" id="quickISIDesc">3분이면 완료되는 과학적 검사</p>
                            <a href="/assessment?type=isi" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition" id="quickISIBtn">
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
                            <h3 class="text-xl font-bold mb-2" id="quickLog">수면일지 작성</h3>
                            <p class="text-gray-600 mb-6" id="quickLogDesc">어제 밤 수면 상태 기록하기</p>
                            <a href="/sleep-log" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition" id="quickLogBtn">
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
                            <h3 class="text-xl font-bold mb-2" id="quickClinic">병원 찾기</h3>
                            <p class="text-gray-600 mb-6" id="quickClinicDesc">가까운 수면클리닉 검색</p>
                            <a href="/clinics" class="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition" id="quickClinicBtn">
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
                        <h3 class="text-xl font-bold mb-4" id="siteName">SomniCare</h3>
                        <p class="text-gray-400" id="siteTagline">
                            불면증 치료·케어 종합 관리 플랫폼
                        </p>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">서비스</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/assessment" class="hover:text-white" id="menuAssessment">자가진단</a></li>
                            <li><a href="/program" class="hover:text-white" id="menuProgram">CBT-I 프로그램</a></li>
                            <li><a href="/clinics" class="hover:text-white" id="menuClinics">병원 찾기</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="font-bold mb-4">정보</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="/about" class="hover:text-white" id="footerAbout">소개</a></li>
                            <li><a href="/privacy" class="hover:text-white" id="footerPrivacy">개인정보처리방침</a></li>
                            <li><a href="/terms" class="hover:text-white" id="footerTerms">이용약관</a></li>
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
                    <p id="footerCopyright">&copy; 2025 SomniCare. All rights reserved.</p>
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
          
          // Apply translations
          function applyTranslations() {
            // Helper function to translate element by ID
            const translate = (id, key) => {
              const el = document.getElementById(id);
              if (el) el.textContent = t(key);
            };
            
            // Header
            translate('siteName', 'siteName');
            translate('siteTagline', 'siteTagline');
            translate('menuHome', 'menuHome');
            translate('menuWellness', 'menuWellness');
            translate('menuAssessment', 'menuAssessment');
            translate('menuProgram', 'menuProgram');
            translate('menuClinics', 'menuClinics');
            
            // Hero Section
            translate('heroTitle', 'heroTitle');
            translate('heroSubtitle', 'heroSubtitle');
            translate('btnFreeTest', 'btnFreeTest');
            translate('btnViewProgram', 'btnViewProgram');
            
            // Features Section
            translate('featuresTitle', 'featuresTitle');
            translate('featureRiskScore', 'featureRiskScore');
            translate('featureRiskDesc', 'featureRiskDesc');
            translate('featureAI', 'featureAI');
            translate('featureAIDesc', 'featureAIDesc');
            translate('featureWellness', 'featureWellness');
            translate('featureWellnessDesc', 'featureWellnessDesc');
            translate('featureCare', 'featureCare');
            translate('featureCareDesc', 'featureCareDesc');
            translate('featureHospital', 'featureHospital');
            translate('featureHospitalDesc', 'featureHospitalDesc');
            
            // Quick Actions
            translate('quickTitle', 'quickTitle');
            translate('quickISI', 'quickISI');
            translate('quickISIDesc', 'quickISIDesc');
            translate('quickISIBtn', 'quickISIBtn');
            translate('quickLog', 'quickLog');
            translate('quickLogDesc', 'quickLogDesc');
            translate('quickLogBtn', 'quickLogBtn');
            translate('quickClinic', 'quickClinic');
            translate('quickClinicDesc', 'quickClinicDesc');
            translate('quickClinicBtn', 'quickClinicBtn');
            
            // Footer
            translate('footerAbout', 'footerAbout');
            translate('footerPrivacy', 'footerPrivacy');
            translate('footerTerms', 'footerTerms');
            translate('footerCopyright', 'footerCopyright');
            
            // Update current language display
            const langNames = {
              'ko': '한국어',
              'en': 'English',
              'zh': '中文',
              'ja': '日本語',
              'es': 'Español',
              'fr': 'Français',
              'de': 'Deutsch',
              'vi': 'Tiếng Việt',
              'th': 'ไทย',
              'id': 'Bahasa Indonesia'
            };
            const currentLang = getCurrentLanguage();
            const el_currentLangText = document.getElementById('currentLangText');
            if (el_currentLangText) el_currentLangText.textContent = langNames[currentLang] || '한국어';
            
            // Highlight active language in dropdown
            document.querySelectorAll('.lang-dropdown-content button').forEach(btn => {
              btn.classList.remove('active');
            });
            const langButtons = document.querySelectorAll('.lang-dropdown-content button');
            const langMap = { 'ko': 0, 'en': 1, 'zh': 2, 'ja': 3, 'es': 4, 'fr': 5, 'de': 6, 'vi': 7, 'th': 8, 'id': 9 };
            if (langButtons[langMap[currentLang]]) {
              langButtons[langMap[currentLang]].classList.add('active');
            }
          }
          
          // Initialize on page load
          document.addEventListener('DOMContentLoaded', () => {
            checkHealth();
            loadDashboard();
            applyTranslations();
          });
        </script>
    </body>
    </html>
  `)
})

// ==================== Additional Page Routes ====================

// CBT-I Program Page
app.get('/program', (c) => {
  return c.redirect('/static/program.html')
})

// Sleep Log Page
app.get('/sleep-log', (c) => {
  return c.redirect('/static/sleep-log.html')
})

// About Page
app.get('/about', (c) => {
  return c.redirect('/static/about.html')
})

// Privacy Policy Page
app.get('/privacy', (c) => {
  return c.redirect('/static/privacy.html')
})

// Terms of Service Page
app.get('/terms', (c) => {
  return c.redirect('/static/terms.html')
})

// Wellness Yoga Page
app.get('/wellness/yoga', (c) => {
  return c.redirect('/static/yoga.html')
})

// Wellness Breathing Page
app.get('/wellness/breathing', (c) => {
  return c.redirect('/static/breathing.html')
})

// Wellness ASMR Page
app.get('/wellness/asmr', (c) => {
  return c.redirect('/static/asmr.html')
})

export default app
