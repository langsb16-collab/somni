# SomniCare - 불면증 치료·케어 종합 관리 플랫폼

## 프로젝트 개요

**SomniCare**는 불면증을 단순히 검사하고 끝나는 것이 아니라, **진단 → 치료 → 생활습관 → 병원 연계**까지 풀 사이클로 관리하는 디지털 수면 클리닉 플랫폼입니다.

### 목표
- 만성 불면/수면장애 환자를 위한 종합 케어 솔루션 제공
- 과학적 근거 기반 CBT-I (인지행동치료) 프로그램 제공
- 실시간 환경·행동 데이터 기반 불면 리스크 예측
- 가족/보호자 연동 케어 시스템
- 전국 수면클리닉 연계 서비스

## 주요 기능 (완료된 기능)

### ✅ 1. 웰니스 콘텐츠 패키지 (신규!)
불면 치료 보조 콘텐츠로 의료 신뢰감과 웰니스 감성을 조합한 무료 서비스

**URL**: `/wellness`

#### A) 수면 음악 플레이어 (`/wellness/music`)
- α파/θ파 기반 안정 음악 (7종)
- 호흡 동기화 BGM, 백색소음, 빗소리, 자연음
- 타이머 기능 (10/20/30/60분)
- 자동 페이드아웃 (슬립 타이머)
- 심야 모드 (화면 밝기 최소화)
- 볼륨 조절

**특징**:
- 클리닉 모드: 야간 각성 시 자동 재생 제안
- 해외 사용자: 콘텐츠만 제공, 치료 표현 금지
- API: `GET /api/wellness/music`

#### B) 요가 & 스트레칭 (3종)
- 취침 전 5분 이완 스트레칭
- 복식호흡 + 목/어깨 긴장 완화 루틴
- 기상 직후 몸 깨우기 3분 순환
- 텍스트 + 일러스트 가이드
- API: `GET /api/wellness/yoga`

#### C) 호흡 안정 루틴 (4종)
- 4-7-8 호흡법 (빠른 수면 유도)
- 5-5-5 균형 호흡
- 박스 호흡법 (긴장 완화)
- 심박수 안정화 호흡 (10분)
- 원형 애니메이션, 색상 흐름 효과
- API: `GET /api/wellness/breathing`

#### D) ASMR 사운드룸 (10종)
- 빗소리, 파도, 장작, 숲 속 새소리
- 백색/핑크/브라운 노이즈
- 바이노럴 오디오 (이어폰 최적화)
- 심야 모드, 무한 반복
- API: `GET /api/wellness/asmr`

#### E) 케어링 모드 API
- QR 초대 시스템 (10분 만료)
- 보호자-피보호자 연결
- 실시간 알림 공유
- API: `/api/care/invite`, `/api/care/accept`, `/api/care/alerts`

**공공 사업용 안전 안내**:
- 무료 제공
- 의료 처방 대체 표현 금지
- 중증 위험군 시 의료기관 안내 표출

### ✅ 2. 불면증 자가진단 (ISI)
- **7문항 ISI (Insomnia Severity Index)** 평가
- 실시간 점수 계산 및 해석
- 이메일 결과 전송 (선택)
- 다국어 지원 (한국어/영어/중국어)
- 점수별 맞춤 수면 루틴 추천
- 유튜브 수면 개선 영상 추천

**URL**: `/assessment`

**특징**:
- 0-7점: 정상 범위
- 8-14점: 경도 불면
- 15-21점: 중등도 불면
- 22-28점: 중증 불면 (전문 상담 권장 + 병원 안내)

### ✅ 2. 병원 연계 시스템
- 전국 수면클리닉 데이터베이스
- 수면다원검사 가능 병원 표시
- 병원 위치, 연락처, 웹사이트 정보 제공
- 지역별 검색 기능

**URL**: `/clinics`

**샘플 병원**:
- 삼성서울병원 수면질환센터
- 분당서울대병원 수면센터
- 서울아산병원 수면다원검사실

### ✅ 4. REST API 엔드포인트

#### 기존 API
- `GET /api/health` - 헬스체크
- `GET /api/questionnaires` - 전체 설문 목록
- `GET /api/questionnaires/:type` - 특정 설문 조회
- `POST /api/questionnaires/:type/responses` - 설문 응답 저장
- `GET /api/sleep-sessions` - 수면 세션 조회
- `POST /api/sleep-sessions` - 수면 세션 저장
- `GET /api/risk-score/today` - 오늘의 리스크 점수
- `POST /api/risk-score` - 리스크 점수 저장
- `GET /api/clinics` - 병원 검색
- `GET /api/clinics/:id` - 병원 상세 조회
- `GET /api/cbt/programs` - CBT-I 프로그램 목록
- `GET /api/cbt/programs/:id/modules` - 프로그램 모듈 조회
- `GET /api/dashboard` - 사용자 대시보드 데이터

#### 웰니스 API (신규!)
- `GET /api/wellness/music` - 음악 콘텐츠 목록
- `GET /api/wellness/music/:id` - 음악 상세 조회
- `GET /api/wellness/yoga` - 요가 루틴 목록
- `GET /api/wellness/yoga/:id` - 요가 루틴 상세
- `GET /api/wellness/breathing` - 호흡 루틴 목록
- `GET /api/wellness/breathing/:id` - 호흡 루틴 상세
- `GET /api/wellness/asmr` - ASMR 사운드 목록
- `POST /api/wellness/activity` - 활동 기록 저장
- `GET /api/wellness/activities` - 사용자 활동 내역
- `GET /api/wellness/preferences` - 사용자 선호도 조회
- `POST /api/wellness/preferences` - 사용자 선호도 저장

#### 케어링 모드 API (신규!)
- `GET /api/care/links` - 케어 연결 목록
- `POST /api/care/invite` - QR 초대 생성
- `POST /api/care/accept` - QR 초대 수락
- `GET /api/care/alerts` - 케어 알림 조회

### ✅ 5. 데이터베이스 (Cloudflare D1)

#### 기존 테이블 (15개)
- **users** - 사용자 정보
- **profiles** - 사용자 프로필
- **sleep_sessions** - 수면 기록
- **questionnaires** - 설문지 (ISI, PSQI, PHQ-9, GAD-7)
- **questionnaire_responses** - 설문 응답
- **cbt_programs** - CBT-I 프로그램
- **cbt_modules** - CBT-I 모듈
- **user_cbt_progress** - CBT 진행 상황
- **risk_scores** - 불면 리스크 점수
- **events** - 알림/이벤트
- **clinics** - 병원 정보
- **care_links** - 보호자 연결
- **daily_habits** - 일일 습관 기록
- **coach_conversations** - AI 코치 대화 기록
- **permissions** - 권한 관리

#### 웰니스 테이블 (신규 6개)
- **music_content** - 수면 음악 콘텐츠 (7건)
- **yoga_content** - 요가/스트레칭 루틴 (3건)
- **breathing_routines** - 호흡 루틴 (4건)
- **asmr_content** - ASMR 사운드 (10건)
- **wellness_activities** - 사용자 활동 기록
- **user_wellness_preferences** - 사용자 선호도

#### 케어링 모드 테이블 (신규 3개)
- **care_links** - 보호자-피보호자 연결
- **care_invites** - QR 초대 토큰 (10분 만료)
- **care_alerts** - 케어 알림 로그

**총 테이블 수**: 24개

## 아직 구현하지 않은 기능

### 🚧 5. AI 수면 코치
- 대화형 챗봇 인터페이스
- 실시간 수면 상담
- 맞춤 루틴 추천

### 🚧 6. CBT-I 프로그램 페이지
- 6주 단계별 프로그램 진행
- 주차별 모듈 콘텐츠
- 진행률 추적

### 🚧 7. 수면 일지
- 일일 수면 기록
- 수면 효율 계산
- 통계 그래프

### 🚧 8. 실시간 불면 리스크 스코어
- 폰 센서 데이터 수집
- 환경 요인 분석 (조도, 소음)
- 행동 패턴 분석 (화면 사용)

### 🚧 9. 가족/케어 모드
- 보호자 앱 연동
- 대상자 수면 모니터링
- 야간 이상행동 감지

### 🚧 10. 정부/지자체 포털
- KPI 대시보드
- 통계 보고서
- 데이터 분석

## 기술 스택

- **Framework**: Hono (경량 웹 프레임워크)
- **Runtime**: Cloudflare Pages/Workers
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## 로컬 개발 환경 설정

### 1. 의존성 설치
```bash
cd /home/user/webapp
npm install
```

### 2. 데이터베이스 마이그레이션
```bash
# 로컬 D1 데이터베이스에 스키마 적용 (3개 마이그레이션)
npm run db:migrate:local

# 기본 샘플 데이터 주입
npm run db:seed

# 웰니스 샘플 데이터 주입 ⭐ 신규!
npx wrangler d1 execute somnicare-production --local --file=./seed_wellness.sql
```

### 3. 빌드
```bash
npm run build
```

### 4. 로컬 서버 실행
```bash
# PM2로 실행 (권장)
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# 서버 상태 확인
curl http://localhost:3000/api/health

# 로그 확인
pm2 logs somnicare --nostream
```

## 배포

### Cloudflare Pages 배포
```bash
# 프로덕션 배포
npm run deploy

# 데이터베이스 마이그레이션 (프로덕션)
npm run db:migrate:prod
```

## 프로젝트 구조

```
webapp/
├── src/
│   └── index.tsx              # 메인 Hono 애플리케이션
├── public/
│   └── static/
│       ├── wellness.html      # 웰니스 허브 메인 ⭐ 신규!
│       ├── music.html         # 음악 플레이어 ⭐ 신규!
│       └── assessment.html    # ISI 자가진단 페이지
├── migrations/
│   ├── 0001_initial_schema.sql    # 초기 DB 스키마
│   ├── 0002_wellness_content.sql  # 웰니스 콘텐츠 ⭐ 신규!
│   └── 0003_caring_mode.sql       # 케어링 모드 ⭐ 신규!
├── seed.sql                   # 기본 샘플 데이터
├── seed_wellness.sql          # 웰니스 샘플 데이터 ⭐ 신규!
├── ecosystem.config.cjs       # PM2 설정
├── wrangler.jsonc            # Cloudflare 설정
├── package.json              # NPM 스크립트
└── README.md                 # 프로젝트 문서
```

## URLs

- **홈페이지**: `/`
- **웰니스 허브**: `/wellness` ⭐ 신규!
- **수면 음악**: `/wellness/music` ⭐ 신규!
- **ISI 자가진단**: `/assessment`
- **병원 찾기**: `/clinics`
- **API 문서**: `/api/health` (헬스체크)

## 데이터 모델

### Users (사용자)
- 이메일, 이름, 성별, 출생연도, 역할, 언어, 타임존

### Sleep Sessions (수면 세션)
- 수면 시작 시간, 기상 시간, 각성 횟수, 수면 효율, 수면 질

### Questionnaires (설문지)
- ISI, PSQI, PHQ-9, GAD-7

### CBT Programs (CBT-I 프로그램)
- 6주 프로그램, 주차별 모듈

### Risk Scores (리스크 점수)
- 일일 불면 리스크, 화면 사용 시간, 소음 레벨, 조도 레벨

## 향후 개발 계획

1. **AI 코치 통합** - OpenAI GPT-4 기반 대화형 상담
2. **센서 데이터 수집** - 실시간 환경 모니터링
3. **가족 케어 모드** - 보호자 앱 개발
4. **정부 과제 대시보드** - KPI 및 통계 시각화
5. **모바일 앱** - React Native 또는 Flutter
6. **웨어러블 연동** - 애플워치, 갤럭시워치 등

## 라이선스

MIT License

## 작성자

SomniCare Development Team - 2025

## 연락처

문의사항은 GitHub Issues를 통해 남겨주세요.

---

**마지막 업데이트**: 2025-12-26  
**버전**: 0.2.0 (MVP + 웰니스 패키지 ⭐)  
**상태**: ✅ 모든 시스템 정상 작동
