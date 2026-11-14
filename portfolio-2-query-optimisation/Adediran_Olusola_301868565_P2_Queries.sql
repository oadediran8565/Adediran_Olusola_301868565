-- Show related lesson_session, class_group, room records (up to 20).
SELECT t0."session_id" AS "lesson_session_session_id",
       t0."subject" AS "lesson_session_subject",
       t1."class_group_id" AS "class_group_class_group_id",
       t1."group_code" AS "class_group_group_code",
       t2."room_id" AS "room_room_id",
       t2."room_code" AS "room_room_code"
FROM portfolio."lesson_session" t0
JOIN portfolio."class_group" t1 ON t0."class_group_id" = t1."class_group_id"
JOIN portfolio."room" t2 ON t0."room_id" = t2."room_id"
ORDER BY t0."session_id", t1."class_group_id", t2."room_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."session_id" AS "lesson_session_session_id",
       t0."subject" AS "lesson_session_subject",
       t1."class_group_id" AS "class_group_class_group_id",
       t1."group_code" AS "class_group_group_code",
       t2."room_id" AS "room_room_id",
       t2."room_code" AS "room_room_code"
FROM portfolio."lesson_session" t0
JOIN portfolio."class_group" t1 ON t0."class_group_id" = t1."class_group_id"
JOIN portfolio."room" t2 ON t0."room_id" = t2."room_id"
ORDER BY t0."session_id", t1."class_group_id", t2."room_id"
LIMIT 20;

-- Find lesson_session records where starts_at matches "2026-11-16T09:00:00+00:00" (up to 20).
SELECT * FROM portfolio."lesson_session"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-11-16T09:00:00+00:00'
ORDER BY "session_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."lesson_session"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-11-16T09:00:00+00:00'
ORDER BY "session_id"
LIMIT 20;

-- Count lesson_session records for each class_group_id (up to 20 groups).
SELECT "class_group_id", count(*) AS record_count
FROM portfolio."lesson_session"
GROUP BY "class_group_id"
ORDER BY record_count DESC, "class_group_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "class_group_id", count(*) AS record_count
FROM portfolio."lesson_session"
GROUP BY "class_group_id"
ORDER BY record_count DESC, "class_group_id" NULLS LAST
LIMIT 20;
