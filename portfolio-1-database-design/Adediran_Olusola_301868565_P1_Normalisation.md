# Bay Secondary School lesson scheduling — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| class_group_id | lesson_session records (list) |
| --- | --- |
| 101 | [301,303] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| lesson_session.session_id | lesson_session.class_group_id | lesson_session.room_id | lesson_session.subject | class_group.class_group_id | class_group.group_code | room.room_id | room.room_code |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | Mathematics | 101 | 7A | 201 | B101 |
| 302 | 102 | 202 | Science | 102 | 8B | 202 | B202 |
| 303 | 101 | 201 | English | 101 | 7A | 201 | B101 |

Key: session_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## lesson_session_example

| lesson_session.session_id | lesson_session.class_group_id | lesson_session.room_id | lesson_session.subject | class_group.class_group_id | class_group.group_code | room.room_id | room.room_code |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | Mathematics | 101 | 7A | 201 | B101 |
| 302 | 102 | 202 | Science | 102 | 8B | 202 | B202 |
| 303 | 101 | 201 | English | 101 | 7A | 201 | B101 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## class_group

| class_group_id | group_code | year_level | active |
| --- | --- | --- | --- |
| 101 | 7A | 7 | true |
| 102 | 8B | 8 | true |

## room

| room_id | room_code | capacity | accessible |
| --- | --- | --- | --- |
| 201 | B101 | 30 | true |
| 202 | B202 | 24 | false |

## lesson_session

| session_id | class_group_id | room_id | subject | starts_at | ends_at | status |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | Mathematics | 2026-11-16T09:00:00+00:00 | 2026-11-16T10:00:00+00:00 | scheduled |
| 302 | 102 | 202 | Science | 2026-11-16T09:00:00+00:00 | 2026-11-16T10:00:00+00:00 | scheduled |
| 303 | 101 | 201 | English | 2026-11-16T11:00:00+00:00 | 2026-11-16T12:00:00+00:00 | cancelled |

## Dependencies

- class_group: (class_group_id) → group_code, year_level, active
- room: (room_id) → room_code, capacity, accessible
- lesson_session: (session_id) → class_group_id, room_id, subject, starts_at, ends_at, status

Joining the decomposed sample tables reproduces the original 3 example rows. The design assumes the declared keys describe the relevant business dependencies.
