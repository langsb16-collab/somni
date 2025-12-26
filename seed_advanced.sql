-- 확장 기능 샘플 데이터
-- SomniCare 케어링 모드 + 복약 + 노트
-- 작성일: 2025-12-26

-- ====================================
-- 1. 복약 정보 (Demo User용)
-- ====================================

-- 사용자 1번의 처방약
INSERT OR IGNORE INTO medications (id, user_id, name, dosage, frequency, prescribed_by, start_date, is_active, notes) VALUES
(1, 1, '수면 보조제 A', '10mg', '1일 1회 취침 전', '서울수면클리닉', '2025-12-01', 1, '의사 처방에 따라 복용'),
(2, 1, '멜라토닌', '3mg', '1일 1회 취침 30분 전', '서울수면클리닉', '2025-12-10', 1, '자연 수면 유도제');

-- 복약 일지 (최근 7일)
INSERT OR IGNORE INTO medication_logs (id, medication_id, user_id, taken, taken_at, scheduled_at, notes) VALUES
(1, 1, 1, 1, '2025-12-20 22:30:00', '2025-12-20 22:00:00', '제시간 복용'),
(2, 1, 1, 1, '2025-12-21 22:15:00', '2025-12-21 22:00:00', '조금 늦게 복용'),
(3, 1, 1, 0, NULL, '2025-12-22 22:00:00', '깜빡하고 건너뜀'),
(4, 1, 1, 1, '2025-12-23 22:00:00', '2025-12-23 22:00:00', '제시간 복용'),
(5, 1, 1, 1, '2025-12-24 22:05:00', '2025-12-24 22:00:00', '제시간 복용'),
(6, 1, 1, 1, '2025-12-25 21:55:00', '2025-12-25 22:00:00', '조금 일찍 복용'),
(7, 1, 1, 1, '2025-12-26 22:10:00', '2025-12-26 22:00:00', '제시간 복용'),

(8, 2, 1, 1, '2025-12-24 21:30:00', '2025-12-24 21:30:00', '멜라토닌 복용'),
(9, 2, 1, 1, '2025-12-25 21:35:00', '2025-12-25 21:30:00', '멜라토닌 복용'),
(10, 2, 1, 1, '2025-12-26 21:28:00', '2025-12-26 21:30:00', '멜라토닌 복용');

-- ====================================
-- 2. 케어 노트 (보호자/환자 코멘트)
-- ====================================

-- 환자 자신의 노트
INSERT OR IGNORE INTO care_notes (id, care_link_id, user_id, author_role, note_type, content, flag) VALUES
(1, NULL, 1, 'self', 'general', '오늘은 새벽 3시에 깨서 한 시간 정도 잠을 못 잤습니다. 걱정거리가 있어서 그런 것 같습니다.', 'normal'),
(2, NULL, 1, 'self', 'behavioral', '저녁에 커피를 마셔서 그런지 잠들기가 어려웠습니다. 다음부터는 오후 3시 이후에는 카페인을 피해야겠습니다.', 'normal'),
(3, NULL, 1, 'self', 'medical', '약을 깜빡하고 안 먹었더니 수면 질이 많이 떨어진 것 같습니다.', 'warn');

-- 보호자 노트 (care_link_id 1번 - 아들/딸이 부모를 케어하는 경우)
-- 실제 care_links 데이터가 있다고 가정
INSERT OR IGNORE INTO care_notes (id, care_link_id, user_id, author_role, note_type, content, flag, is_shared) VALUES
(4, 1, 2, 'caregiver', 'general', '부모님이 최근 며칠간 새벽에 자주 깨신다고 하십니다. 병원 상담을 고려해봐야 할 것 같습니다.', 'warn', 1),
(5, 1, 2, 'caregiver', 'behavioral', '오늘 저녁 식사 후 산책을 함께 하셨는데, 잠드는 시간이 평소보다 빨라졌습니다.', 'normal', 0);

-- ====================================
-- 3. 수면 기록에 risk_level 업데이트
-- ====================================

-- 기존 sleep_sessions 데이터의 risk_level 업데이트
UPDATE sleep_sessions SET risk_level = 'green' WHERE sleep_quality >= 7;
UPDATE sleep_sessions SET risk_level = 'yellow' WHERE sleep_quality BETWEEN 4 AND 6;
UPDATE sleep_sessions SET risk_level = 'red' WHERE sleep_quality < 4;

-- ====================================
-- 4. 스트레스 이벤트 샘플
-- ====================================

INSERT OR IGNORE INTO stress_events (id, user_id, event_date, event_type, severity, description, impact_on_sleep) VALUES
(1, 1, '2025-12-20', 'work_conflict', 4, '직장에서 상사와 갈등이 있었습니다.', '잠들기 어려움, 자주 깸'),
(2, 1, '2025-12-23', 'health_concern', 3, '건강검진 결과를 기다리는 중이라 걱정됩니다.', '생각이 많아서 잠들기 어려움'),
(3, 1, '2025-12-25', 'family_issue', 2, '가족 모임에서 사소한 다툼이 있었습니다.', '약간 불안했지만 금방 잠듦');

-- ====================================
-- 5. 수면 패턴 프로필 (Demo User)
-- ====================================

INSERT OR IGNORE INTO sleep_patterns (id, user_id, chronotype, work_schedule, preferred_sleep_time, preferred_wake_time, caffeine_cutoff_time, exercise_preferred_time) VALUES
(1, 1, 'evening', 'regular', '23:00:00', '07:00:00', '15:00:00', 'evening');

-- ====================================
-- 6. 수면 교육 콘텐츠 샘플
-- ====================================

INSERT OR IGNORE INTO education_content (id, title, category, summary, full_content, duration_minutes, difficulty, tags) VALUES
(1, '수면 위생 10계명', 'sleep_hygiene', 
 '좋은 수면을 위한 기본 수칙 10가지', 
 '1. 매일 같은 시간에 잠자리에 들고 일어나기
2. 침실을 시원하고 어둡게 유지하기
3. 오후 3시 이후 카페인 피하기
4. 저녁 늦게 과식하지 않기
5. 규칙적으로 운동하기 (단, 잠들기 3시간 전까지)
6. 낮잠은 20분 이내로 제한하기
7. 침실에서 TV/스마트폰 사용 자제하기
8. 잠들기 1시간 전 블루라이트 차단하기
9. 수면 의식(루틴) 만들기
10. 스트레스 관리하기',
 3, 'beginner', '["수면위생", "기본수칙", "생활습관"]'),

(2, '카페인과 알코올이 수면에 미치는 영향', 'caffeine_alcohol',
 '카페인과 알코올이 수면 질에 미치는 부정적 영향',
 '카페인은 각성 효과가 4~6시간 지속되므로 오후 3시 이후에는 피하는 것이 좋습니다. 알코올은 잠들기 쉽게 하지만 REM 수면을 방해하고 새벽에 자주 깨게 만듭니다.',
 2, 'beginner', '["카페인", "알코올", "수면방해"]'),

(3, '불면증과 우울/불안의 관계', 'mental_health',
 '불면증과 정신건강의 상호작용',
 '불면증은 우울증과 불안장애의 원인이자 결과일 수 있습니다. 수면 부족은 감정 조절을 어렵게 하고, 우울/불안은 다시 수면을 방해합니다. 악순환을 끊기 위해서는 전문가의 도움이 필요할 수 있습니다.',
 3, 'intermediate', '["정신건강", "우울증", "불안장애"]'),

(4, '침실 환경 최적화하기', 'environment',
 '숙면을 위한 이상적인 침실 환경',
 '- 온도: 18-20도가 이상적
- 조명: 완전히 어둡게 (암막커튼 사용)
- 소음: 귀마개 또는 백색소음 활용
- 침구: 편안한 매트리스와 베개
- 청결: 깨끗하고 정돈된 공간',
 2, 'beginner', '["침실환경", "온도", "조명", "소음"]');

-- ====================================
-- 7. 챌린지 샘플
-- ====================================

INSERT OR IGNORE INTO sleep_challenges (id, title, description, challenge_type, duration_days, success_criteria_json, reward_badge, difficulty) VALUES
(1, '7일 연속 같은 시간에 기상하기', '7일 동안 매일 같은 시간(±30분)에 일어나는 챌린지', 'consistent_wakeup', 7, '{"type": "consecutive_days", "target": 7, "tolerance_minutes": 30}', '일찍 일어나는 새', 'easy'),
(2, '3일 연속 잠들기 1시간 전 휴대폰 OFF', '수면 1시간 전에 스마트폰을 끄고 다른 활동하기', 'phone_off', 3, '{"type": "consecutive_days", "target": 3}', '디지털 디톡스', 'medium'),
(3, '1주일 카페인 오후 3시 이후 금지', '오후 3시 이후에는 커피, 차, 에너지음료 등 카페인 섭취 금지', 'caffeine_cutoff', 7, '{"type": "consecutive_days", "target": 7}', '카페인 마스터', 'medium');

-- 사용자 챌린지 참여 기록
INSERT OR IGNORE INTO user_challenges (id, user_id, challenge_id, start_date, status, progress_json) VALUES
(1, 1, 1, '2025-12-20', 'active', '{"days_completed": 7, "total_days": 7, "success_dates": ["2025-12-20", "2025-12-21", "2025-12-22", "2025-12-23", "2025-12-24", "2025-12-25", "2025-12-26"]}'),
(2, 1, 2, '2025-12-24', 'active', '{"days_completed": 2, "total_days": 3}');

-- ====================================
-- 8. 위험도 계산 로그 샘플
-- ====================================

INSERT OR IGNORE INTO risk_calculation_logs (id, user_id, calculation_date, sleep_score_factor, medication_factor, stress_factor, routine_factor, final_risk_level, algorithm_version) VALUES
(1, 1, '2025-12-25', 0.7, 0.9, 0.6, 0.8, 'yellow', 'v1.0'),
(2, 1, '2025-12-26', 0.8, 1.0, 0.7, 0.9, 'green', 'v1.0');
