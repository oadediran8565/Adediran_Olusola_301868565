# Bay Secondary School lesson scheduling — ER diagram

```mermaid
erDiagram
    direction LR
    class_group {
        bigint class_group_id PK
        text group_code UK
        integer year_level
        boolean active
    }
    room {
        bigint room_id PK
        text room_code UK
        integer capacity
        boolean accessible
    }
    lesson_session {
        bigint session_id PK
        bigint class_group_id FK
        bigint room_id FK
        text subject
        timestamptz starts_at
        timestamptz ends_at
        text status
    }
    class_group ||--o{ lesson_session : "class_group_id"
    room ||--o{ lesson_session : "room_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Adediran_Olusola_301868565_ERDiagram.png)
