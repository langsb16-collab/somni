# SomniCare Deployment Guide

## 🌐 Live Demo

**Public URL**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai

## 📍 Available Pages

### Main Pages
- **홈페이지**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/
- **ISI 자가진단**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/assessment
- **병원 찾기**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/clinics

### API Endpoints
- **Health Check**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/api/health
- **Dashboard**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/api/dashboard?user_id=1
- **Questionnaires**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/api/questionnaires
- **Clinics**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/api/clinics
- **Sleep Sessions**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/api/sleep-sessions?user_id=1
- **Risk Score**: https://3000-icupea8amoarckh8yvb0t-cc2fbc16.sandbox.novita.ai/api/risk-score/today?user_id=1

## ✅ Test Results

### API Health Check
```bash
curl http://localhost:3000/api/health
# Response: {"status":"ok","timestamp":"2025-12-26T21:19:37.065Z"}
```

### Dashboard Data
```bash
curl http://localhost:3000/api/dashboard?user_id=1
# Returns: latest_sleep, latest_isi, risk_score, cbt_progress
```

### Database Tables
- ✅ 15 tables created successfully
- ✅ Sample data seeded (4 questionnaires, 4 clinics, 1 demo user, 6 CBT modules)
- ✅ All indexes created

### Server Status
- ✅ PM2 process running
- ✅ Wrangler Pages dev server active
- ✅ D1 local database connected
- ✅ All API endpoints responding

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:migrate:local
npm run db:seed
```

### 3. Build
```bash
npm run build
```

### 4. Start Server
```bash
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

### 5. Test
```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/dashboard?user_id=1
```

## 📊 Sample Data

### Demo User
- Email: demo@somnicare.com
- Name: 데모 사용자
- Latest ISI Score: 12 (경도 불면)
- Sleep Efficiency: 85.5%
- Risk Score: 65

### Questionnaires
1. **ISI** - 불면증 심각도 지수 (7문항)
2. **PSQI** - 피츠버그 수면 질 지수
3. **PHQ-9** - 우울증 선별도구
4. **GAD-7** - 범불안장애 선별도구

### Clinics
1. 서울수면센터
2. 삼성서울병원 수면질환센터
3. 분당서울대병원 수면센터
4. 서울아산병원 수면다원검사실

## 🔧 Troubleshooting

### Port Already in Use
```bash
fuser -k 3000/tcp 2>/dev/null || true
```

### PM2 Process Issues
```bash
pm2 delete somnicare
pm2 start ecosystem.config.cjs
```

### Database Reset
```bash
npm run db:reset
```

### Check Logs
```bash
pm2 logs somnicare --nostream
```

## 📝 Development Notes

- Server runs on port 3000
- Uses Cloudflare D1 local database (SQLite)
- PM2 manages the process
- Hot reload enabled for development
- CORS enabled for API routes

## 🌟 Features Implemented

### ✅ Completed
- [x] ISI 자가진단 (7문항, 다국어 지원)
- [x] 병원 검색 및 상세 정보
- [x] REST API (13개 엔드포인트)
- [x] D1 데이터베이스 (15개 테이블)
- [x] 샘플 데이터 (설문지, 병원, 사용자)
- [x] 반응형 UI (Tailwind CSS)
- [x] 메인 홈페이지
- [x] Git 버전 관리

### 🚧 To Be Implemented
- [ ] AI 수면 코치 챗봇
- [ ] CBT-I 프로그램 페이지
- [ ] 수면 일지 기록
- [ ] 실시간 리스크 스코어링
- [ ] 가족/케어 모드
- [ ] 정부/지자체 대시보드
- [ ] 다국어 완전 지원 (영어, 중국어)
- [ ] 모바일 앱 (React Native)

---

**Last Updated**: 2025-12-26
**Version**: 0.1.0 (MVP)
**Status**: ✅ All Systems Operational
