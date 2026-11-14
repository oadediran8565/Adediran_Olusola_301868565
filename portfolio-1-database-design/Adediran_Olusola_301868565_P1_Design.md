# Bay Secondary School lesson scheduling — database design

My case study records class_group, room, lesson_session.

## Users

- Timetable coordinators plan and update lesson schedules.
- School administrators review schedules and room usage.

## Main operations

- Schedule, reschedule, and cancel lessons for class groups.
- Review lesson details by date range, class group, or room using joins and filters.
- Summarize scheduled lesson counts and durations by room using joins, filters, and aggregation.
- Separate benchmark plan: create 50000 synthetic lesson_session rows, compare the same date-range filter before and after a B-tree index on starts_at, and record query plans and timings without assuming an outcome.

## Entities

| Entity | Information stored |
| --- | --- |
| class_group | A teaching group that can be assigned lesson sessions, without student-level records. |
| room | A school room that may be assigned to lesson sessions. |
| lesson_session | A scheduled or cancelled lesson linked to one class group and one room. |

## class_group

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| class_group_id | BIGINT | PK | Yes |
| group_code | TEXT | Unique | Yes |
| year_level | INTEGER |  | Yes |
| active | BOOLEAN |  | Yes |
- Unique key: (group_code).

## room

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| room_id | BIGINT | PK | Yes |
| room_code | TEXT | Unique | Yes |
| capacity | INTEGER |  | Yes |
| accessible | BOOLEAN |  | Yes |
- Unique key: (room_code).

## lesson_session

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| session_id | BIGINT | PK | Yes |
| class_group_id | BIGINT | FK | Yes |
| room_id | BIGINT | FK | Yes |
| subject | TEXT |  | Yes |
| starts_at | TIMESTAMPTZ |  | Yes |
| ends_at | TIMESTAMPTZ |  | Yes |
| status | TEXT |  | Yes |
- class_group_id → class_group.class_group_id
- room_id → room.room_id

## Relationships and business rules

- A class group's year_level must be from 7 through 12 inclusive.
- A room's capacity must be greater than zero.
- A lesson session's ends_at must be later than starts_at.
- A lesson session's status must be scheduled or cancelled.
- Each lesson session's class_group_id must reference an existing class_group.class_group_id.
- Each lesson session's room_id must reference an existing room.room_id.
- Among scheduled sessions, a room may have at most one session with a given starts_at value; enforce this with a partial unique key on room_id and starts_at where status is scheduled.

## Assumptions

- SECONDARY SCHOOL_BAY refers to a fictional institution called Bay Secondary School.
- Class groups and rooms are the scheduling units; no student names or student identifiers are modeled.
- Each lesson session has one class group, one room, a subject, and start and end timestamps.
- Identifier values are globally unique across the entities, even though each entity has its own single-column primary key.
- Only scheduled sessions are subject to the same-room, same-start-time concurrency rule.
- All records, identifiers, and benchmark rows are synthetic.

