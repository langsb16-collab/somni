-- 케어링 모드 DB 스키마: 보호자-피보호자 연결, QR 초대 시스템
-- 작성일: 2025-12-26
-- SomniCare 케어링 모드

-- 케어 연결 테이블 (보호자-피보호자 관계)
CREATE TABLE IF NOT EXISTS care_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL, -- 피보호자 (환자)
  caregiver_id INTEGER NOT NULL, -- 보호자
  relationship TEXT, -- 'family', 'friend', 'medical_staff', 'other'
  permissions_json TEXT NOT NULL, -- JSON: {"can_view_sleep_score": true, "can_view_routines": true, "can_receive_alerts": true}
  status TEXT DEFAULT 'active', -- 'active', 'paused', 'terminated'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (caregiver_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_care_patient ON care_links(patient_id);
CREATE INDEX IF NOT EXISTS idx_care_caregiver ON care_links(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_care_status ON care_links(status);

-- QR 초대 토큰 테이블
CREATE TABLE IF NOT EXISTS care_invites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL, -- 초대를 생성한 피보호자
  token TEXT NOT NULL UNIQUE, -- QR 코드에 포함될 고유 토큰
  permissions_json TEXT NOT NULL, -- 초대 시 부여할 권한
  expires_at DATETIME NOT NULL, -- 토큰 만료 시간 (생성 후 10분)
  used_at DATETIME, -- 토큰 사용 시간
  used_by_user_id INTEGER, -- 토큰을 사용한 보호자 ID
  status TEXT DEFAULT 'pending', -- 'pending', 'used', 'expired', 'revoked'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (used_by_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_invite_token ON care_invites(token);
CREATE INDEX IF NOT EXISTS idx_invite_patient ON care_invites(patient_id);
CREATE INDEX IF NOT EXISTS idx_invite_status ON care_invites(status);
CREATE INDEX IF NOT EXISTS idx_invite_expires ON care_invites(expires_at);

-- 케어 알림 로그 테이블
CREATE TABLE IF NOT EXISTS care_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  care_link_id INTEGER NOT NULL, -- 관련 케어 연결
  patient_id INTEGER NOT NULL,
  caregiver_id INTEGER NOT NULL,
  alert_type TEXT NOT NULL, -- 'high_risk_score', 'insomnia_worsening', 'missed_routine', 'emergency'
  severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  message TEXT NOT NULL,
  data_json TEXT, -- 추가 데이터 (예: 점수, 날짜 등)
  read_at DATETIME, -- 읽음 처리 시간
  acknowledged_at DATETIME, -- 확인 처리 시간
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (care_link_id) REFERENCES care_links(id),
  FOREIGN KEY (patient_id) REFERENCES users(id),
  FOREIGN KEY (caregiver_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_alert_care_link ON care_alerts(care_link_id);
CREATE INDEX IF NOT EXISTS idx_alert_caregiver ON care_alerts(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_alert_type ON care_alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_alert_severity ON care_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alert_read ON care_alerts(read_at);
