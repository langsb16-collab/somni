-- 웰니스 콘텐츠 샘플 데이터
-- SomniCare 웰니스 패키지 시드 데이터
-- 작성일: 2025-12-26

-- ====================================
-- 1. 수면유도 음악 콘텐츠
-- ====================================

INSERT OR IGNORE INTO music_content (id, title, category, duration_seconds, audio_url, thumbnail_url, description, tags, bpm, is_premium, play_count, rating) VALUES
(1, 'α파 안정 수면 음악 (30분)', 'alpha_wave', 1800, 'https://cdn.somnicare.com/music/alpha_wave_30min.mp3', 'https://cdn.somnicare.com/thumbnails/alpha_wave.jpg', '뇌파를 α파(알파파) 상태로 유도하여 깊은 이완과 수면을 돕습니다.', '["수면유도", "α파", "이완"]', 60, 0, 1250, 4.7),

(2, 'θ파 깊은 수면 음악 (60분)', 'theta_wave', 3600, 'https://cdn.somnicare.com/music/theta_wave_60min.mp3', 'https://cdn.somnicare.com/thumbnails/theta_wave.jpg', 'θ파(세타파) 주파수로 깊은 수면 상태를 유도합니다.', '["깊은수면", "θ파", "REM수면"]', 55, 0, 980, 4.8),

(3, '호흡 동기화 BGM (20분)', 'breathing_sync', 1200, 'https://cdn.somnicare.com/music/breathing_sync_20min.mp3', 'https://cdn.somnicare.com/thumbnails/breathing_sync.jpg', '저역대 리듬이 호흡과 동기화되어 자연스러운 수면 유도', '["호흡동기화", "저주파", "리듬"]', 50, 0, 765, 4.6),

(4, '백색소음 (화이트노이즈)', 'white_noise', 0, 'https://cdn.somnicare.com/music/white_noise_loop.mp3', 'https://cdn.somnicare.com/thumbnails/white_noise.jpg', '모든 주파수가 고르게 분포된 백색소음으로 외부 소음 차단', '["백색소음", "노이즈차단", "집중"]', NULL, 0, 2100, 4.5),

(5, '비 오는 소리 (30분)', 'rain', 1800, 'https://cdn.somnicare.com/music/rain_30min.mp3', 'https://cdn.somnicare.com/thumbnails/rain.jpg', '잔잔한 빗소리가 마음을 안정시키고 수면을 유도합니다', '["빗소리", "자연음", "ASMR"]', NULL, 0, 1850, 4.9),

(6, '난로 타는 소리 (45분)', 'fire', 2700, 'https://cdn.somnicare.com/music/fireplace_45min.mp3', 'https://cdn.somnicare.com/thumbnails/fireplace.jpg', '장작 타는 소리의 편안함으로 숙면을 돕습니다', '["난로", "장작", "겨울"]', NULL, 0, 1420, 4.7),

(7, '숲 속 자연음 (60분)', 'nature', 3600, 'https://cdn.somnicare.com/music/forest_60min.mp3', 'https://cdn.somnicare.com/thumbnails/forest.jpg', '새소리, 바람소리 등 숲 속의 평화로운 자연음', '["자연음", "숲", "힐링"]', NULL, 0, 1620, 4.8);

-- ====================================
-- 2. 요가/스트레칭 콘텐츠
-- ====================================

INSERT OR IGNORE INTO yoga_content (id, title, category, duration_seconds, video_url, illustration_url, steps, difficulty, benefits, warnings, is_premium, completion_count, rating) VALUES
(1, '취침 전 5분 이완 스트레칭', 'bedtime_stretch', 300, 'https://cdn.somnicare.com/video/bedtime_stretch_5min.mp4', 'https://cdn.somnicare.com/illustrations/bedtime_stretch.jpg',
'[
  {"step": 1, "text": "편안한 자세로 앉아 눈을 감고 깊게 호흡합니다 (30초)", "duration": 30, "image": "step1.jpg"},
  {"step": 2, "text": "목을 천천히 좌우로 돌려 긴장을 풀어줍니다 (40초)", "duration": 40, "image": "step2.jpg"},
  {"step": 3, "text": "어깨를 위아래로 움직이며 근육을 이완시킵니다 (40초)", "duration": 40, "image": "step3.jpg"},
  {"step": 4, "text": "상체를 좌우로 천천히 비틀어줍니다 (60초)", "duration": 60, "image": "step4.jpg"},
  {"step": 5, "text": "다리를 쭉 펴고 발목을 돌려줍니다 (50초)", "duration": 50, "image": "step5.jpg"},
  {"step": 6, "text": "마지막으로 전신을 쭉 펴며 하품을 합니다 (40초)", "duration": 40, "image": "step6.jpg"}
]',
'beginner', '["목/어깨 긴장 완화", "숙면 유도", "혈액순환 개선"]', '목이나 어깨에 통증이 있는 경우 무리하지 마세요. 디스크 질환이 있다면 의료진과 상담 후 실시하세요.', 0, 3200, 4.8),

(2, '복식호흡 + 목/어깨 긴장 완화 루틴', 'breathing_relaxation', 480, 'https://cdn.somnicare.com/video/breathing_shoulder_8min.mp4', 'https://cdn.somnicare.com/illustrations/breathing_relax.jpg',
'[
  {"step": 1, "text": "바닥에 편안히 누워 배에 손을 올립니다", "duration": 30, "image": "step1.jpg"},
  {"step": 2, "text": "코로 천천히 숨을 들이마시며 배가 부풀어 오르게 합니다 (4초)", "duration": 60, "image": "step2.jpg"},
  {"step": 3, "text": "잠시 멈춥니다 (2초)", "duration": 30, "image": "step3.jpg"},
  {"step": 4, "text": "입으로 천천히 숨을 내쉬며 배가 들어가게 합니다 (6초)", "duration": 60, "image": "step4.jpg"},
  {"step": 5, "text": "위 과정을 5회 반복합니다", "duration": 120, "image": "step5.jpg"},
  {"step": 6, "text": "일어나 앉아 목을 천천히 좌우로 스트레칭합니다", "duration": 60, "image": "step6.jpg"},
  {"step": 7, "text": "어깨를 크게 원을 그리며 돌려줍니다", "duration": 60, "image": "step7.jpg"},
  {"step": 8, "text": "마지막으로 깊은 호흡 3회로 마무리합니다", "duration": 60, "image": "step8.jpg"}
]',
'beginner', '["복식호흡 훈련", "목/어깨 긴장 완화", "자율신경 안정"]', '천식이나 호흡기 질환이 있는 경우 주의하세요.', 0, 2100, 4.7),

(3, '기상 직후 몸 깨우기 3분 순환', 'morning_wakeup', 180, 'https://cdn.somnicare.com/video/morning_wakeup_3min.mp4', 'https://cdn.somnicare.com/illustrations/morning_wakeup.jpg',
'[
  {"step": 1, "text": "침대에서 천천히 몸을 일으키며 기지개를 켭니다", "duration": 20, "image": "step1.jpg"},
  {"step": 2, "text": "목을 좌우로 천천히 돌립니다", "duration": 30, "image": "step2.jpg"},
  {"step": 3, "text": "앉은 자세에서 팔을 위로 쭉 뻗어 올립니다", "duration": 30, "image": "step3.jpg"},
  {"step": 4, "text": "상체를 좌우로 천천히 비틀어줍니다", "duration": 40, "image": "step4.jpg"},
  {"step": 5, "text": "일어나서 제자리에서 가볍게 뛰어줍니다", "duration": 30, "image": "step5.jpg"},
  {"step": 6, "text": "마지막으로 깊은 호흡 3회", "duration": 30, "image": "step6.jpg"}
]',
'beginner', '["상쾌한 기상", "혈액순환", "신진대사 활성화"]', '혈압이 높거나 어지럼증이 있는 경우 천천히 진행하세요.', 0, 1850, 4.6);

-- ====================================
-- 3. 호흡 안정 루틴
-- ====================================

INSERT OR IGNORE INTO breathing_routines (id, title, type, duration_seconds, inhale_seconds, hold_seconds, exhale_seconds, cycles, description, benefits, animation_type, color_theme, is_premium, completion_count, rating) VALUES
(1, '4-7-8 호흡법 (2분)', '4-7-8', 120, 4, 7, 8, 6, '앤드류 웨일 박사가 개발한 수면 유도 호흡법. 4초 들이마시고, 7초 멈추고, 8초 내쉽니다.', '["빠른 수면 유도", "불안 감소", "심박수 안정"]', 'circular', 'blue_white', 0, 4200, 4.9),

(2, '5-5-5 균형 호흡 (5분)', '5-5-5', 300, 5, 5, 5, 20, '5초씩 균등하게 들이마시고, 멈추고, 내쉬는 균형 호흡법', '["심신 안정", "집중력 향상", "스트레스 해소"]', 'circular', 'green_teal', 0, 3100, 4.7),

(3, '박스 호흡법 (3분)', 'box_breathing', 180, 4, 4, 4, 11, '4초씩 네 단계로 진행하는 박스 호흡. 미 해군 특수부대(SEALs)에서도 사용합니다.', '["극도의 긴장 완화", "정신 집중", "불안 조절"]', 'pulse', 'purple_pink', 0, 2800, 4.8),

(4, '심박수 안정화 호흡 (10분)', 'heart_rate_calm', 600, 6, 2, 8, 36, '천천히 깊게 호흡하여 심박수를 낮추고 부교감신경을 활성화합니다', '["심박수 감소", "혈압 안정", "깊은 이완"]', 'wave', 'blue_white', 0, 1950, 4.8);

-- ====================================
-- 4. ASMR/힐링 사운드
-- ====================================

INSERT OR IGNORE INTO asmr_content (id, title, category, duration_seconds, audio_url, thumbnail_url, description, is_binaural, night_mode_optimized, volume_preset, tags, is_premium, play_count, rating) VALUES
(1, '잔잔한 빗소리 (60분)', 'rain', 3600, 'https://cdn.somnicare.com/asmr/gentle_rain_60min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_rain.jpg', '창문을 두드리는 부드러운 빗소리', 0, 1, 'medium', '["빗소리", "자연음", "집중"]', 0, 5200, 4.9),

(2, '바람 소리 (45분)', 'wind', 2700, 'https://cdn.somnicare.com/asmr/wind_45min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_wind.jpg', '나무 사이를 지나는 바람 소리', 0, 1, 'low', '["바람", "자연음", "명상"]', 0, 3100, 4.7),

(3, '장작 타는 소리 (60분)', 'fire', 3600, 'https://cdn.somnicare.com/asmr/fireplace_60min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_fire.jpg', '벽난로에서 장작이 타는 따뜻한 소리', 0, 1, 'medium', '["난로", "장작", "겨울"]', 0, 4200, 4.8),

(4, '파도 소리 (90분)', 'ocean', 5400, 'https://cdn.somnicare.com/asmr/ocean_waves_90min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_ocean.jpg', '해변에서 밀려오는 파도 소리', 0, 1, 'medium', '["파도", "바다", "휴식"]', 0, 3800, 4.8),

(5, '숲 속 새소리 (60분)', 'forest', 3600, 'https://cdn.somnicare.com/asmr/forest_birds_60min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_forest.jpg', '평화로운 숲 속의 새소리와 바람', 0, 1, 'low', '["새소리", "숲", "힐링"]', 0, 2900, 4.7),

(6, '화이트 노이즈 (무한)', 'white_noise', NULL, 'https://cdn.somnicare.com/asmr/white_noise_loop.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_white.jpg', '외부 소음을 차단하는 백색소음', 0, 1, 'medium', '["백색소음", "차단", "집중"]', 0, 6100, 4.6),

(7, '핑크 노이즈 (무한)', 'pink_noise', NULL, 'https://cdn.somnicare.com/asmr/pink_noise_loop.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_pink.jpg', '더 부드러운 주파수의 핑크 노이즈', 0, 1, 'medium', '["핑크노이즈", "수면", "이완"]', 0, 4700, 4.7),

(8, '브라운 노이즈 (무한)', 'brown_noise', NULL, 'https://cdn.somnicare.com/asmr/brown_noise_loop.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_brown.jpg', '저주파 중심의 깊은 브라운 노이즈', 0, 1, 'low', '["브라운노이즈", "깊은수면", "저주파"]', 0, 3500, 4.8),

(9, '빗소리 + 천둥소리 (바이노럴)', 'rain', 3600, 'https://cdn.somnicare.com/asmr/rain_thunder_binaural_60min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_thunder.jpg', '이어폰 착용 시 최적화된 입체적 빗소리와 멀리서 들리는 천둥', 1, 1, 'medium', '["빗소리", "천둥", "바이노럴", "이어폰"]', 0, 2800, 4.9),

(10, '고양이 그르렁 소리 (30분)', 'nature', 1800, 'https://cdn.somnicare.com/asmr/cat_purring_30min.mp3', 'https://cdn.somnicare.com/thumbnails/asmr_cat.jpg', '고양이의 편안한 그르렁 소리', 0, 1, 'low', '["고양이", "그르렁", "힐링"]', 0, 3300, 4.9);

-- ====================================
-- 5. 사용자 웰니스 활동 샘플 (Demo User용)
-- ====================================

INSERT OR IGNORE INTO wellness_activities (id, user_id, activity_type, content_id, content_title, duration_seconds, completed, rating, feedback, created_at) VALUES
(1, 1, 'music', 1, 'α파 안정 수면 음악 (30분)', 1800, 1, 5, '정말 잘 들었어요. 금방 잠들었습니다.', '2025-12-24 22:30:00'),
(2, 1, 'yoga', 1, '취침 전 5분 이완 스트레칭', 300, 1, 5, '간단하고 효과적입니다', '2025-12-25 22:15:00'),
(3, 1, 'breathing', 1, '4-7-8 호흡법 (2분)', 120, 1, 5, '불안이 금방 줄어들었어요', '2025-12-25 22:45:00'),
(4, 1, 'asmr', 1, '잔잔한 빗소리 (60분)', 2400, 0, 4, '40분 정도 듣다가 잠들었습니다', '2025-12-25 23:00:00'),
(5, 1, 'yoga', 3, '기상 직후 몸 깨우기 3분 순환', 180, 1, 4, '아침에 하니 상쾌해요', '2025-12-26 07:00:00');

-- ====================================
-- 6. 사용자 웰니스 선호도 (Demo User용)
-- ====================================

INSERT OR IGNORE INTO user_wellness_preferences (id, user_id, preferred_music_categories, preferred_yoga_categories, preferred_breathing_types, preferred_asmr_categories, night_mode_enabled, auto_recommend_enabled, accessibility_mode, last_updated) VALUES
(1, 1, '["alpha_wave", "rain", "nature"]', '["bedtime_stretch", "breathing_relaxation"]', '["4-7-8", "5-5-5"]', '["rain", "ocean", "white_noise"]', 1, 1, 0, '2025-12-26 21:00:00');
