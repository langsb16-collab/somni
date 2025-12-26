-- 복약 관리, 케어 노트, 수면 기록 확장 마이그레이션
-- 작성일: 2025-12-26
-- SomniCare 케어링 모드 확장

-- ====================================
-- 1. 복약 관리 (Medication Tracking)
-- ====================================

-- 복약 기록 테이블
CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT, -- "10mg", "1정" 등
  frequency TEXT, -- "1일 1회", "취침 전" 등
  prescribed_by TEXT, -- 처방 의료기관
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT 1,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_medications_user ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_active ON medications(is_active);

-- 복약 일지 (실제 복용 기록)
CREATE TABLE IF NOT EXISTS medication_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  medication_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  taken BOOLEAN NOT NULL, -- 복용 여부
  taken_at DATETIME, -- 실제 복용 시간
  scheduled_at DATETIME, -- 예정 시간
  notes TEXT, -- "늦게 복용", "건너뜀" 등
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (medication_id) REFERENCES medications(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_medication_logs_user ON medication_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_medication_logs_date ON medication_logs(taken_at);
CREATE INDEX IF NOT EXISTS idx_medication_logs_scheduled ON medication_logs(scheduled_at);

-- ====================================
-- 2. 케어 노트 (Care Notes) - 이미 care_alerts 테이블이 있으므로 확장
-- ====================================

-- 케어 노트 테이블 (보호자/의료진 코멘트)
-- 기존 care_alerts와 별도로 자유 형식 노트
CREATE TABLE IF NOT EXISTS care_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  care_link_id INTEGER, -- NULL이면 개인 노트
  user_id INTEGER NOT NULL, -- 작성자 (환자 본인 또는 연결된 사람)
  author_role TEXT NOT NULL, -- 'patient', 'caregiver', 'clinician', 'self'
  note_type TEXT DEFAULT 'general', -- 'general', 'medical', 'behavioral', 'emergency'
  content TEXT NOT NULL,
  flag TEXT DEFAULT 'normal', -- 'normal', 'warn', 'urgent'
  attachments_json TEXT, -- JSON array: [{"url": "...", "type": "image"}]
  is_shared BOOLEAN DEFAULT 0, -- 의료진과 공유 여부
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (care_link_id) REFERENCES care_links(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_care_notes_user ON care_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_care_notes_link ON care_notes(care_link_id);
CREATE INDEX IF NOT EXISTS idx_care_notes_flag ON care_notes(flag);
CREATE INDEX IF NOT EXISTS idx_care_notes_date ON care_notes(created_at);

-- ====================================
-- 3. 수면 기록 확장 (Risk Level 추가)
-- ====================================

-- 기존 sleep_sessions 테이블에 risk_level 필드 추가
-- SQLite에서는 ALTER TABLE ADD COLUMN이 안전
ALTER TABLE sleep_sessions ADD COLUMN risk_level TEXT DEFAULT 'green';
-- 'green', 'yellow', 'red' 값

-- risk_level 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_sleep_sessions_risk ON sleep_sessions(risk_level);

-- ====================================
-- 4. 스트레스 이벤트 타임라인 (향후 확장용)
-- ====================================

-- 일상 스트레스 이벤트 기록
CREATE TABLE IF NOT EXISTS stress_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  event_date DATE NOT NULL,
  event_type TEXT NOT NULL, -- 'work_conflict', 'family_issue', 'health_concern', 'financial_stress', 'other'
  severity INTEGER DEFAULT 3, -- 1-5 (1: 경미, 5: 심각)
  description TEXT,
  impact_on_sleep TEXT, -- '잠들기 어려움', '자주 깸', '악몽' 등
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_stress_events_user ON stress_events(user_id);
CREATE INDEX IF NOT EXISTS idx_stress_events_date ON stress_events(event_date);

-- ====================================
-- 5. 교대근무/크로노타입 설정 (향후 확장용)
-- ====================================

-- 사용자 수면 패턴 프로필
CREATE TABLE IF NOT EXISTS sleep_patterns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  chronotype TEXT, -- 'morning', 'intermediate', 'evening', 'irregular'
  work_schedule TEXT, -- 'regular', 'shift', 'night', 'rotating'
  shift_pattern_json TEXT, -- JSON: {"type": "2-2-3", "cycle": [{"day": "mon", "shift": "night"}]}
  preferred_sleep_time TIME,
  preferred_wake_time TIME,
  caffeine_cutoff_time TIME, -- 카페인 제한 시간
  exercise_preferred_time TEXT, -- 'morning', 'afternoon', 'evening'
  light_exposure_schedule TEXT, -- 빛 노출 권장 시간대
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ====================================
-- 6. EHR/병원 연동 기록 (향후 확장용)
-- ====================================

-- 전자건강기록 연동 로그
CREATE TABLE IF NOT EXISTS ehr_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  source TEXT NOT NULL, -- 'hospital_xyz', 'clinic_abc'
  record_type TEXT NOT NULL, -- 'clinical_summary', 'prescription', 'lab_result'
  visit_date DATE,
  provider_name TEXT, -- 담당 의료진
  diagnosis_codes TEXT, -- ICD-10 코드 등
  treatment_plan TEXT,
  medications_prescribed TEXT,
  follow_up_date DATE,
  notes TEXT,
  external_id TEXT, -- 외부 시스템 참조 ID
  raw_data_json TEXT, -- 원본 데이터 JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_ehr_user ON ehr_records(user_id);
CREATE INDEX IF NOT EXISTS idx_ehr_source ON ehr_records(source);
CREATE INDEX IF NOT EXISTS idx_ehr_visit_date ON ehr_records(visit_date);

-- ====================================
-- 7. 수면 교육 콘텐츠 (향후 확장용)
-- ====================================

-- 수면 교육 카드 콘텐츠
CREATE TABLE IF NOT EXISTS education_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'sleep_hygiene', 'caffeine_alcohol', 'mental_health', 'environment'
  content_type TEXT DEFAULT 'card', -- 'card', 'article', 'video'
  summary TEXT NOT NULL, -- 짧은 요약 (1-3분 분량)
  full_content TEXT, -- 상세 내용
  icon_url TEXT,
  duration_minutes INTEGER, -- 읽기/시청 예상 시간
  difficulty TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  tags TEXT, -- JSON array
  view_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_education_category ON education_content(category);

-- 사용자 교육 진행 기록
CREATE TABLE IF NOT EXISTS user_education_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content_id INTEGER NOT NULL,
  viewed BOOLEAN DEFAULT 0,
  completed BOOLEAN DEFAULT 0,
  helpful BOOLEAN, -- 도움 됨 여부
  notes TEXT,
  viewed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (content_id) REFERENCES education_content(id)
);

CREATE INDEX IF NOT EXISTS idx_user_education_user ON user_education_progress(user_id);

-- ====================================
-- 8. 챌린지/목표 시스템 (향후 확장용)
-- ====================================

-- 수면 개선 챌린지
CREATE TABLE IF NOT EXISTS sleep_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  challenge_type TEXT NOT NULL, -- 'consistent_wakeup', 'phone_off', 'caffeine_cutoff'
  duration_days INTEGER NOT NULL,
  success_criteria_json TEXT, -- JSON: {"type": "consecutive_days", "target": 7}
  reward_badge TEXT,
  difficulty TEXT DEFAULT 'easy', -- 'easy', 'medium', 'hard'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 챌린지 참여 기록
CREATE TABLE IF NOT EXISTS user_challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  challenge_id INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'failed', 'abandoned'
  progress_json TEXT, -- JSON: {"days_completed": 5, "total_days": 7}
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (challenge_id) REFERENCES sleep_challenges(id)
);

CREATE INDEX IF NOT EXISTS idx_user_challenges_user ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_status ON user_challenges(status);

-- ====================================
-- 9. 음성/사진 기반 수면일지 (향후 확장용)
-- ====================================

-- 멀티미디어 수면 일지
CREATE TABLE IF NOT EXISTS multimedia_sleep_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  log_date DATE NOT NULL,
  voice_note_url TEXT, -- 음성 파일 URL
  voice_transcript TEXT, -- AI 변환 텍스트
  photo_url TEXT, -- 침실 사진 URL
  photo_analysis_json TEXT, -- AI 분석 결과: {"lighting": "bright", "cleanliness": "good"}
  auto_summary TEXT, -- AI 생성 요약
  mood TEXT, -- 'good', 'neutral', 'bad'
  energy_level INTEGER, -- 1-5
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_multimedia_logs_user ON multimedia_sleep_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_multimedia_logs_date ON multimedia_sleep_logs(log_date);

-- ====================================
-- 10. 위험도 계산 히스토리 (분석용)
-- ====================================

-- 위험도 계산 로그 (디버깅/분석용)
CREATE TABLE IF NOT EXISTS risk_calculation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  calculation_date DATE NOT NULL,
  sleep_score_factor REAL, -- 수면 점수 기여도
  medication_factor REAL, -- 복약 준수 기여도
  stress_factor REAL, -- 스트레스 이벤트 기여도
  routine_factor REAL, -- 루틴 완료 기여도
  final_risk_level TEXT, -- 최종 위험도
  algorithm_version TEXT, -- 계산 알고리즘 버전
  raw_data_json TEXT, -- 원본 입력 데이터
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_risk_calc_user ON risk_calculation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_risk_calc_date ON risk_calculation_logs(calculation_date);
