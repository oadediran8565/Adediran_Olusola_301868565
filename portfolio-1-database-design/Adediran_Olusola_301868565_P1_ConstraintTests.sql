-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. test class group pk. Expected: pk_class_group, SQLSTATE 23505.
INSERT INTO portfolio."class_group" ("class_group_id", "group_code", "year_level", "active")
VALUES (101, '9C', 9, TRUE);

-- 2. test class group unique. Expected: uq_class_group_0, SQLSTATE 23505.
INSERT INTO portfolio."class_group" ("class_group_id", "group_code", "year_level", "active")
VALUES (401, '7A', 9, TRUE);

-- 3. test class group not null. Expected: class_group_id, SQLSTATE 23502.
INSERT INTO portfolio."class_group" ("class_group_id", "group_code", "year_level", "active")
VALUES (NULL, '9C', 9, TRUE);

-- 4. test room pk. Expected: pk_room, SQLSTATE 23505.
INSERT INTO portfolio."room" ("room_id", "room_code", "capacity", "accessible")
VALUES (201, 'C303', 18, TRUE);

-- 5. test room unique. Expected: uq_room_0, SQLSTATE 23505.
INSERT INTO portfolio."room" ("room_id", "room_code", "capacity", "accessible")
VALUES (402, 'B101', 18, TRUE);

-- 6. test session pk. Expected: pk_lesson_session, SQLSTATE 23505.
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status")
VALUES (301, 102, 202, 'Art', '2026-11-17T13:00:00+00:00', '2026-11-17T14:00:00+00:00', 'cancelled');

-- 7. test session group fk. Expected: fk_lesson_session_0, SQLSTATE 23503.
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status")
VALUES (403, 9999, 201, 'History', '2026-11-17T09:00:00+00:00', '2026-11-17T10:00:00+00:00', 'scheduled');

-- 8. test session room fk. Expected: fk_lesson_session_1, SQLSTATE 23503.
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status")
VALUES (404, 101, 9999, 'Geography', '2026-11-17T10:00:00+00:00', '2026-11-17T11:00:00+00:00', 'scheduled');

-- 9. test group year check. Expected: group_year_range, SQLSTATE 23514.
INSERT INTO portfolio."class_group" ("class_group_id", "group_code", "year_level", "active")
VALUES (405, '9C', 6, TRUE);

-- 10. test room capacity check. Expected: room_capacity_positive, SQLSTATE 23514.
INSERT INTO portfolio."room" ("room_id", "room_code", "capacity", "accessible")
VALUES (406, 'C303', 0, TRUE);

-- 11. test session time check. Expected: session_time_order, SQLSTATE 23514.
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status")
VALUES (407, 101, 202, 'Music', '2026-11-18T10:00:00+00:00', '2026-11-18T09:00:00+00:00', 'cancelled');

-- 12. test session status check. Expected: session_status_valid, SQLSTATE 23514.
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status")
VALUES (408, 102, 202, 'Drama', '2026-11-18T11:00:00+00:00', '2026-11-18T12:00:00+00:00', 'pending');

-- 13. test session room start unique. Expected: session_room_start_unique, SQLSTATE 23505.
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status")
VALUES (409, 102, 201, 'Physics', '2026-11-16T09:00:00+00:00', '2026-11-16T10:00:00+00:00', 'scheduled');
