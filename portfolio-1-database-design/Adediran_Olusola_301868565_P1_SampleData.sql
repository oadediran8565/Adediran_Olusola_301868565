-- Fictional sample records for Bay Secondary School lesson scheduling.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."class_group" ("class_group_id", "group_code", "year_level", "active") VALUES (101, '7A', 7, TRUE);
INSERT INTO portfolio."class_group" ("class_group_id", "group_code", "year_level", "active") VALUES (102, '8B', 8, TRUE);
INSERT INTO portfolio."room" ("room_id", "room_code", "capacity", "accessible") VALUES (201, 'B101', 30, TRUE);
INSERT INTO portfolio."room" ("room_id", "room_code", "capacity", "accessible") VALUES (202, 'B202', 24, FALSE);
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status") VALUES (301, 101, 201, 'Mathematics', '2026-11-16T09:00:00+00:00', '2026-11-16T10:00:00+00:00', 'scheduled');
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status") VALUES (302, 102, 202, 'Science', '2026-11-16T09:00:00+00:00', '2026-11-16T10:00:00+00:00', 'scheduled');
INSERT INTO portfolio."lesson_session" ("session_id", "class_group_id", "room_id", "subject", "starts_at", "ends_at", "status") VALUES (303, 101, 201, 'English', '2026-11-16T11:00:00+00:00', '2026-11-16T12:00:00+00:00', 'cancelled');
COMMIT;
