-- Insert default questionnaires

-- ISI (Insomnia Severity Index)
INSERT INTO questionnaires (type, version, name, description, meta_json) VALUES (
  'ISI',
  '1.0',
  '불면증 심각도 지수 (ISI)',
  '지난 2주간의 불면증 증상을 평가하는 7문항 설문',
  '{"questions":[{"id":"q1","text":"잠들기 어려움","score_range":[0,4]},{"id":"q2","text":"수면 유지 어려움 / 자주 깸","score_range":[0,4]},{"id":"q3","text":"너무 일찍 깸","score_range":[0,4]},{"id":"q4","text":"수면 만족도","score_range":[0,4]},{"id":"q5","text":"일상 기능 영향","score_range":[0,4]},{"id":"q6","text":"스트레스·걱정 수준","score_range":[0,4]},{"id":"q7","text":"전체적 심각도","score_range":[0,4]}],"scoring":{"0-7":"정상 범위","8-14":"경도 불면","15-21":"중등도 불면","22-28":"중증 불면"}}'
);

-- PSQI (Pittsburgh Sleep Quality Index)
INSERT INTO questionnaires (type, version, name, description, meta_json) VALUES (
  'PSQI',
  '1.0',
  '피츠버그 수면 질 지수 (PSQI)',
  '지난 1개월간의 전반적인 수면 질을 평가',
  '{"questions":[],"scoring":{"0-5":"양호한 수면 질","6-10":"보통","11-21":"수면 질 저하"}}'
);

-- PHQ-9 (Patient Health Questionnaire-9)
INSERT INTO questionnaires (type, version, name, description, meta_json) VALUES (
  'PHQ9',
  '1.0',
  '우울증 선별도구 (PHQ-9)',
  '지난 2주간의 우울 증상을 평가',
  '{"questions":[],"scoring":{"0-4":"최소 우울","5-9":"경도 우울","10-14":"중등도 우울","15-19":"중등도-중증 우울","20-27":"중증 우울"}}'
);

-- GAD-7 (Generalized Anxiety Disorder-7)
INSERT INTO questionnaires (type, version, name, description, meta_json) VALUES (
  'GAD7',
  '1.0',
  '범불안장애 선별도구 (GAD-7)',
  '지난 2주간의 불안 증상을 평가',
  '{"questions":[],"scoring":{"0-4":"최소 불안","5-9":"경도 불안","10-14":"중등도 불안","15-21":"중증 불안"}}'
);

-- Insert default CBT-I program
INSERT INTO cbt_programs (name, description, weeks, is_active) VALUES (
  'CBT-I 기본 6주 프로그램',
  '인지행동치료 기반 불면증 치료 프로그램',
  6,
  1
);

-- Insert CBT-I modules
INSERT INTO cbt_modules (program_id, week_number, title, content_html, tasks_json, order_index) VALUES 
(1, 1, '수면 교육과 평가', '<h3>1주차: 수면의 이해</h3><p>수면의 구조와 불면증의 원인을 이해합니다.</p>', '{"tasks":["수면일지 작성 시작","현재 수면 패턴 기록"]}', 1),
(1, 2, '수면 제한 요법', '<h3>2주차: 수면 압력 높이기</h3><p>침대에 머무는 시간을 줄여 수면 효율을 높입니다.</p>', '{"tasks":["수면 창 설정","기상 시간 고정"]}', 2),
(1, 3, '자극 통제 요법', '<h3>3주차: 침대와 수면의 연결</h3><p>침대를 수면 전용 공간으로 만듭니다.</p>', '{"tasks":["20분 규칙 적용","침대에서 깨어있지 않기"]}', 3),
(1, 4, '수면 위생 교육', '<h3>4주차: 수면 환경 최적화</h3><p>빛, 소음, 온도 등 환경 요인을 조절합니다.</p>', '{"tasks":["카페인 시간 제한","운동 시간 조정"]}', 4),
(1, 5, '인지 재구성', '<h3>5주차: 수면에 대한 생각 바꾸기</h3><p>수면에 대한 비합리적 믿음을 수정합니다.</p>', '{"tasks":["걱정 시간 정하기","수면 일기 쓰기"]}', 5),
(1, 6, '유지 및 재발 방지', '<h3>6주차: 장기 관리 전략</h3><p>습득한 기술을 지속하고 재발을 예방합니다.</p>', '{"tasks":["개인 수면 계획 수립","위기 대응 전략 준비"]}', 6);

-- Insert sample clinics
INSERT INTO clinics (name, city, address, lat, lng, type, has_polysomnography, url, phone) VALUES 
('서울수면센터', '서울', '서울시 강남구', 37.5172, 127.0473, '수면전문', 1, 'https://example.com/seoul-sleep', '02-1234-5678'),
('삼성서울병원 수면질환센터', '서울', '서울시 강남구 일원로 81', 37.4881, 127.0856, '대학병원', 1, 'https://www.samsunghospital.com', '1599-3114'),
('분당서울대병원 수면센터', '경기', '경기도 성남시 분당구 구미로 173번길 82', 37.3519, 127.1242, '대학병원', 1, 'https://www.snubh.org', '031-787-7000'),
('서울아산병원 수면다원검사실', '서울', '서울시 송파구 올림픽로 43길 88', 37.5267, 127.1087, '대학병원', 1, 'https://www.amc.seoul.kr', '1688-7575');

-- Insert demo user
INSERT INTO users (email, name, gender, birth_year, role, language) VALUES 
('demo@somnicare.com', '데모 사용자', 'M', 1985, 'user', 'ko');

-- Insert demo profile
INSERT INTO profiles (user_id, occupation, shift_worker, primary_condition, target_bedtime, target_waketime) VALUES 
(1, '직장인', 0, 'insomnia', '23:00', '07:00');

-- Insert demo sleep session
INSERT INTO sleep_sessions (user_id, date, sleep_onset, wake_time, awakenings_count, sleep_efficiency, sleep_quality, source) VALUES 
(1, date('now', '-1 day'), datetime('now', '-9 hours'), datetime('now', '-2 hours'), 2, 85.5, 7, 'manual');

-- Insert demo questionnaire response (ISI)
INSERT INTO questionnaire_responses (user_id, questionnaire_id, score, answers_json, interpretation) VALUES 
(1, 1, 12, '{"q1":2,"q2":2,"q3":1,"q4":2,"q5":2,"q6":2,"q7":1}', '경도 불면 경향');

-- Insert demo risk score
INSERT INTO risk_scores (user_id, date, score, screen_time, noise_level, light_level, caffeine_intake) VALUES 
(1, date('now'), 65, 120, 45.5, 150.0, 2);

-- Insert demo daily habits
INSERT INTO daily_habits (user_id, date, caffeine_count, alcohol_count, exercise_minutes, nap_minutes, stress_level) VALUES 
(1, date('now'), 2, 0, 30, 0, 5);
