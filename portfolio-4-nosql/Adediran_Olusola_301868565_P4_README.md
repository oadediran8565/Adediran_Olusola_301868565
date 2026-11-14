# Portfolio 4 — NoSQL and Advanced Data Models

I used MongoDB collection lesson_events for session_scheduled and session_rescheduled events. These are fictional event examples based on lesson_session, class_group, room.

## Document model

| Field | Meaning |
| --- | --- |
| _id | Unique string event ID |
| eventType | One of the two selected case event labels |
| occurredAt | Native BSON Date; sample timestamps are in 2030 |
| source | Original entity, primary key and saved JSON snapshot |
| embedded | Linked record snapshots read with the event |
| references | Keys for linked sources kept outside the embedded snapshots |
| details | Event metadata whose fields vary |

Related class_group, room details are stored as snapshots with the event. This makes an event readable in one document. It duplicates some information, and later SQL changes do not automatically update the snapshots. PostgreSQL continues to enforce the relational rules.

## Example document

```javascript
{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "session_scheduled",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "lesson_session",
        "key": {
            "session_id": 301
        },
        "snapshot": {
            "session_id": 301,
            "class_group_id": 101,
            "room_id": 201,
            "subject": "Mathematics",
            "starts_at": "2026-11-16T09:00:00+00:00",
            "ends_at": "2026-11-16T10:00:00+00:00",
            "status": "scheduled"
        }
    },
    "embedded": {
        "class_group": [
            {
                "key": {
                    "class_group_id": 101
                },
                "snapshot": {
                    "class_group_id": 101,
                    "group_code": "7A",
                    "year_level": 7,
                    "active": true
                },
                "via": [
                    "lesson_session.class_group_id → class_group"
                ]
            }
        ],
        "room": [
            {
                "key": {
                    "room_id": 201
                },
                "snapshot": {
                    "room_id": 201,
                    "room_code": "B101",
                    "capacity": 30,
                    "accessible": true
                },
                "via": [
                    "lesson_session.room_id → room"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}
```

## Queries and results

| Query | Returned documents |
| --- | --- |
| Find the first sample event type (up to five documents). | 3 |
| Find events for the first source record using nested key fields (up to five). | 2 |
| Find events in the sample time range using a MongoDB Date filter (up to five). | 5 |
| Count documents for each event type. | 2 |

## 1. Find the first sample event type (up to five documents).

```javascript
db.getCollection("lesson_events").find({"eventType":"session_scheduled"}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "session_id": 301
    }
  },
  {
    "_id": "event_000003",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "session_id": 302
    }
  },
  {
    "_id": "event_000005",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:04:00Z"
    },
    "source": {
      "session_id": 303
    }
  }
]
```

## 2. Find events for the first source record using nested key fields (up to five).

```javascript
db.getCollection("lesson_events").find({"source.key.session_id":301}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "session_id": 301
    }
  },
  {
    "_id": "event_000002",
    "eventType": "session_rescheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "session_id": 301
    }
  }
]
```

## 3. Find events in the sample time range using a MongoDB Date filter (up to five).

```javascript
db.getCollection("lesson_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray();
```

Selected fields from the returned documents:

```json
[
  {
    "_id": "event_000001",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:00:00Z"
    },
    "source": {
      "session_id": 301
    }
  },
  {
    "_id": "event_000002",
    "eventType": "session_rescheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:01:00Z"
    },
    "source": {
      "session_id": 301
    }
  },
  {
    "_id": "event_000003",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:02:00Z"
    },
    "source": {
      "session_id": 302
    }
  },
  {
    "_id": "event_000004",
    "eventType": "session_rescheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:03:00Z"
    },
    "source": {
      "session_id": 302
    }
  },
  {
    "_id": "event_000005",
    "eventType": "session_scheduled",
    "occurredAt": {
      "$date": "2030-01-01T10:04:00Z"
    },
    "source": {
      "session_id": 303
    }
  }
]
```

## 4. Count documents for each event type.

```javascript
db.getCollection("lesson_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray();
```

| _id | documentCount |
| --- | --- |
| session_rescheduled | 3 |
| session_scheduled | 3 |

## Validation and suitability

MongoDB inserted 6 documents. An invalid date type was rejected with code 121 and a repeated event ID with 11000. The collection still contained 6 valid documents. The compound eventType/occurredAt index supports those access fields; this exercise does not measure its speed.

The details field can vary across event types, while the common fields have a validator. Events can be added as separate documents rather than growing one large history record.

## Run the script

Connect mongosh to a fresh exercise database and run Adediran_Olusola_301868565_P4_MongoDB.js. It selects portfolio_nosql, creates the collection, inserts the sample documents and displays the query results. [Implementation evidence](screenshots/Adediran_Olusola_301868565_P4_DocumentsAndQueries.png).

## References

- [MongoDB — data modelling](https://www.mongodb.com/docs/manual/data-modeling/)

