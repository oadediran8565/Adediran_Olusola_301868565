# Bay Secondary School lesson scheduling — SQL queries

## 1. Show related lesson_session, class_group, room records (up to 20).

```sql
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
```

| lesson_session_session_id | lesson_session_subject | class_group_class_group_id | class_group_group_code | room_room_id | room_room_code |
| --- | --- | --- | --- | --- | --- |
| 301 | Mathematics | 101 | 7A | 201 | B101 |
| 302 | Science | 102 | 8B | 202 | B202 |
| 303 | English | 101 | 7A | 201 | B101 |

## 2. Find lesson_session records where starts_at matches "2026-11-16T09:00:00+00:00" (up to 20).

```sql
SELECT * FROM portfolio."lesson_session"
WHERE "starts_at" IS NOT DISTINCT FROM '2026-11-16T09:00:00+00:00'
ORDER BY "session_id"
LIMIT 20;
```

| session_id | class_group_id | room_id | subject | starts_at | ends_at | status |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | Mathematics | 2026-11-16T09:00:00+00:00 | 2026-11-16T10:00:00+00:00 | scheduled |
| 302 | 102 | 202 | Science | 2026-11-16T09:00:00+00:00 | 2026-11-16T10:00:00+00:00 | scheduled |

## 3. Count lesson_session records for each class_group_id (up to 20 groups).

```sql
SELECT "class_group_id", count(*) AS record_count
FROM portfolio."lesson_session"
GROUP BY "class_group_id"
ORDER BY record_count DESC, "class_group_id" NULLS LAST
LIMIT 20;
```

| class_group_id | record_count |
| --- | --- |
| 101 | 2 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 2.231 | 2.231, 2.204, 2.265 | Sort → Seq Scan | 274 |
| After index | 0.233 | 0.244, 0.233, 0.231 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 55 |

The median execution time changed from 2.231 ms to 0.233 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.205..2.207 rows=50 loops=1)
  Seq Scan on lesson_session (actual time=0.013..2.171 rows=50 loops=1)
Planning Time: 0.296 ms
Execution Time: 2.231 ms
```

### Before index, run 2

```text
Sort (actual time=2.176..2.179 rows=50 loops=1)
  Seq Scan on lesson_session (actual time=0.014..2.142 rows=50 loops=1)
Planning Time: 0.296 ms
Execution Time: 2.204 ms
```

### Before index, run 3

```text
Sort (actual time=2.237..2.24 rows=50 loops=1)
  Seq Scan on lesson_session (actual time=0.014..2.203 rows=50 loops=1)
Planning Time: 0.298 ms
Execution Time: 2.265 ms
```

### After index, run 1

```text
Sort (actual time=0.182..0.185 rows=50 loops=1)
  Bitmap Heap Scan on lesson_session (actual time=0.029..0.146 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.015 rows=50 loops=1)
Planning Time: 0.55 ms
Execution Time: 0.244 ms
```

### After index, run 2

```text
Sort (actual time=0.179..0.182 rows=50 loops=1)
  Bitmap Heap Scan on lesson_session (actual time=0.027..0.143 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=50 loops=1)
Planning Time: 0.459 ms
Execution Time: 0.233 ms
```

### After index, run 3

```text
Sort (actual time=0.177..0.18 rows=50 loops=1)
  Bitmap Heap Scan on lesson_session (actual time=0.027..0.141 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.014..0.014 rows=50 loops=1)
Planning Time: 0.463 ms
Execution Time: 0.231 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Adediran_Olusola_301868565_P2_Queries.sql, then Adediran_Olusola_301868565_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Adediran_Olusola_301868565_P2_QueryResults.png) · [Index comparison](screenshots/Adediran_Olusola_301868565_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

