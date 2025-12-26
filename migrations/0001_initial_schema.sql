-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT NOT NULL,
  gender TEXT,
  birth_year INTEGER,
  role TEXT DEFAULT 'user',
  timezone TEXT DEFAULT 'Asia/Seoul',
  language TEXT DEFAULT 'ko',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User profiles
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  occupation TEXT,
  shift_worker INTEGER DEFAULT 0,
  primary_condition TEXT,
  target_bedtime TEXT,
  target_waketime TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sleep sessions
CREATE TABLE IF NOT EXISTS sleep_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date DATE NOT NULL,
  sleep_onset DATETIME,
  wake_time DATETIME,
  awakenings_count INTEGER DEFAULT 0,
  sleep_efficiency REAL,
  sleep_quality INTEGER,
  source TEXT DEFAULT 'manual',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Questionnaires (ISI, PSQI, PHQ-9, GAD-7)
CREATE TABLE IF NOT EXISTS questionnaires (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  version TEXT DEFAULT '1.0',
  name TEXT NOT NULL,
  description TEXT,
  meta_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Questionnaire responses
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  questionnaire_id INTEGER NOT NULL,
  score INTEGER NOT NULL,
  answers_json TEXT NOT NULL,
  interpretation TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaires(id)
);

-- CBT-I Programs
CREATE TABLE IF NOT EXISTS cbt_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  weeks INTEGER DEFAULT 6,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CBT-I Program modules
CREATE TABLE IF NOT EXISTS cbt_modules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content_html TEXT,
  tasks_json TEXT,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (program_id) REFERENCES cbt_programs(id) ON DELETE CASCADE
);

-- User CBT progress
CREATE TABLE IF NOT EXISTS user_cbt_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  program_id INTEGER NOT NULL,
  current_week INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active',
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES cbt_programs(id)
);

-- Risk scores (환경·행동 기반 실시간 불면 리스크)
CREATE TABLE IF NOT EXISTS risk_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date DATE NOT NULL,
  score INTEGER NOT NULL,
  screen_time INTEGER,
  noise_level REAL,
  light_level REAL,
  caffeine_intake INTEGER DEFAULT 0,
  details_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Events (notifications, alerts)
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  title TEXT,
  message TEXT,
  payload_json TEXT,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Clinics (수면클리닉·병원 정보)
CREATE TABLE IF NOT EXISTS clinics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  city TEXT,
  address TEXT,
  lat REAL,
  lng REAL,
  type TEXT,
  has_polysomnography INTEGER DEFAULT 0,
  url TEXT,
  phone TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Care links (가족/보호자 연결)
CREATE TABLE IF NOT EXISTS care_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  caregiver_id INTEGER NOT NULL,
  patient_id INTEGER NOT NULL,
  role TEXT DEFAULT 'family',
  permissions_json TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Daily habits tracking
CREATE TABLE IF NOT EXISTS daily_habits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  date DATE NOT NULL,
  caffeine_count INTEGER DEFAULT 0,
  alcohol_count INTEGER DEFAULT 0,
  exercise_minutes INTEGER DEFAULT 0,
  nap_minutes INTEGER DEFAULT 0,
  stress_level INTEGER,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI coach conversations
CREATE TABLE IF NOT EXISTS coach_conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  context_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_sleep_sessions_user_date ON sleep_sessions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_user ON questionnaire_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_risk_scores_user_date ON risk_scores(user_id, date);
CREATE INDEX IF NOT EXISTS idx_events_user ON events(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_care_links_caregiver ON care_links(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_care_links_patient ON care_links(patient_id);
CREATE INDEX IF NOT EXISTS idx_daily_habits_user_date ON daily_habits(user_id, date);
