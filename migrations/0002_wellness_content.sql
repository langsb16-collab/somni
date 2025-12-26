-- 웰니스 콘텐츠 테이블 추가: 음악, 요가, 호흡, ASMR
-- 작성일: 2025-12-26
-- SomniCare 웰니스 패키지

-- 음악 콘텐츠 테이블
CREATE TABLE IF NOT EXISTS music_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'alpha_wave', 'theta_wave', 'breathing_sync', 'white_noise', 'rain', 'fire', 'nature'
  duration_seconds INTEGER NOT NULL,
  audio_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  tags TEXT, -- JSON array: ["수면유도", "α파", "저주파"]
  bpm INTEGER, -- 호흡 동기화용 BPM
  is_premium BOOLEAN DEFAULT 0,
  play_count INTEGER DEFAULT 0,
  rating REAL DEFAULT 0.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_music_category ON music_content(category);
CREATE INDEX IF NOT EXISTS idx_music_premium ON music_content(is_premium);

-- 요가/스트레칭 콘텐츠 테이블
CREATE TABLE IF NOT EXISTS yoga_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'bedtime_stretch', 'breathing_relaxation', 'morning_wakeup', 'neck_shoulder', 'full_body'
  duration_seconds INTEGER NOT NULL,
  video_url TEXT, -- 영상 URL (선택)
  illustration_url TEXT, -- 일러스트 이미지 URL
  steps TEXT NOT NULL, -- JSON array: [{"step": 1, "text": "...", "duration": 30, "image": "..."}]
  difficulty TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  benefits TEXT, -- JSON array: ["목/어깨 긴장 완화", "숙면 유도"]
  warnings TEXT, -- 주의사항 (통증/질환 보유자 안내)
  is_premium BOOLEAN DEFAULT 0,
  completion_count INTEGER DEFAULT 0,
  rating REAL DEFAULT 0.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_yoga_category ON yoga_content(category);
CREATE INDEX IF NOT EXISTS idx_yoga_difficulty ON yoga_content(difficulty);

-- 호흡 루틴 콘텐츠 테이블
CREATE TABLE IF NOT EXISTS breathing_routines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- '4-7-8', '5-5-5', 'box_breathing', 'heart_rate_calm'
  duration_seconds INTEGER NOT NULL,
  inhale_seconds INTEGER NOT NULL,
  hold_seconds INTEGER DEFAULT 0,
  exhale_seconds INTEGER NOT NULL,
  cycles INTEGER NOT NULL, -- 반복 횟수
  description TEXT,
  benefits TEXT, -- JSON array: ["심박수 안정", "불안 감소"]
  animation_type TEXT DEFAULT 'circular', -- 'circular', 'wave', 'pulse'
  color_theme TEXT DEFAULT 'blue_white', -- 'blue_white', 'green_teal', 'purple_pink'
  is_premium BOOLEAN DEFAULT 0,
  completion_count INTEGER DEFAULT 0,
  rating REAL DEFAULT 0.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_breathing_type ON breathing_routines(type);

-- ASMR/힐링 사운드 테이블
CREATE TABLE IF NOT EXISTS asmr_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'rain', 'wind', 'fire', 'ocean', 'forest', 'white_noise', 'pink_noise', 'brown_noise'
  duration_seconds INTEGER, -- NULL이면 무한 반복
  audio_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  is_binaural BOOLEAN DEFAULT 0, -- 이어폰 최적화 여부
  night_mode_optimized BOOLEAN DEFAULT 1, -- 심야 모드 최적화
  volume_preset TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
  tags TEXT, -- JSON array
  is_premium BOOLEAN DEFAULT 0,
  play_count INTEGER DEFAULT 0,
  rating REAL DEFAULT 0.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_asmr_category ON asmr_content(category);
CREATE INDEX IF NOT EXISTS idx_asmr_night_mode ON asmr_content(night_mode_optimized);

-- 사용자 웰니스 활동 기록 테이블
CREATE TABLE IF NOT EXISTS wellness_activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  activity_type TEXT NOT NULL, -- 'music', 'yoga', 'breathing', 'asmr'
  content_id INTEGER NOT NULL, -- 해당 콘텐츠 테이블의 ID
  content_title TEXT NOT NULL,
  duration_seconds INTEGER, -- 실제 이용 시간
  completed BOOLEAN DEFAULT 0, -- 완료 여부
  rating INTEGER, -- 1-5 별점
  feedback TEXT, -- 사용자 피드백
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_wellness_user ON wellness_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_type ON wellness_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_wellness_date ON wellness_activities(created_at);

-- 자동 추천 알고리즘을 위한 사용자 선호도 테이블
CREATE TABLE IF NOT EXISTS user_wellness_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  preferred_music_categories TEXT, -- JSON array
  preferred_yoga_categories TEXT, -- JSON array
  preferred_breathing_types TEXT, -- JSON array
  preferred_asmr_categories TEXT, -- JSON array
  night_mode_enabled BOOLEAN DEFAULT 1,
  auto_recommend_enabled BOOLEAN DEFAULT 1,
  accessibility_mode BOOLEAN DEFAULT 0, -- 고령층 모드
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_wellness_pref_user ON user_wellness_preferences(user_id);
