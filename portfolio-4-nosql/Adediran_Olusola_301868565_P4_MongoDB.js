// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("lesson_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("lesson_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "session_scheduled",
                    "session_rescheduled"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "lesson_session"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "session_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("lesson_events").insertMany([
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
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "session_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "change_reason": "illustrative change_reason",
                "equipment_notes": "illustrative equipment_notes",
                "previous_starts_at": "illustrative previous_starts_at"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "session_scheduled",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "lesson_session",
            "key": {
                "session_id": 302
            },
            "snapshot": {
                "session_id": 302,
                "class_group_id": 102,
                "room_id": 202,
                "subject": "Science",
                "starts_at": "2026-11-16T09:00:00+00:00",
                "ends_at": "2026-11-16T10:00:00+00:00",
                "status": "scheduled"
            }
        },
        "embedded": {
            "class_group": [
                {
                    "key": {
                        "class_group_id": 102
                    },
                    "snapshot": {
                        "class_group_id": 102,
                        "group_code": "8B",
                        "year_level": 8,
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
                        "room_id": 202
                    },
                    "snapshot": {
                        "room_id": 202,
                        "room_code": "B202",
                        "capacity": 24,
                        "accessible": false
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
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "session_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "lesson_session",
            "key": {
                "session_id": 302
            },
            "snapshot": {
                "session_id": 302,
                "class_group_id": 102,
                "room_id": 202,
                "subject": "Science",
                "starts_at": "2026-11-16T09:00:00+00:00",
                "ends_at": "2026-11-16T10:00:00+00:00",
                "status": "scheduled"
            }
        },
        "embedded": {
            "class_group": [
                {
                    "key": {
                        "class_group_id": 102
                    },
                    "snapshot": {
                        "class_group_id": 102,
                        "group_code": "8B",
                        "year_level": 8,
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
                        "room_id": 202
                    },
                    "snapshot": {
                        "room_id": 202,
                        "room_code": "B202",
                        "capacity": 24,
                        "accessible": false
                    },
                    "via": [
                        "lesson_session.room_id → room"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "change_reason": "illustrative change_reason",
                "equipment_notes": "illustrative equipment_notes",
                "previous_starts_at": "illustrative previous_starts_at"
            }
        }
    },
    {
        "_id": "event_000005",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "session_scheduled",
        "occurredAt": ISODate("2030-01-01T10:04:00Z"),
        "source": {
            "entity": "lesson_session",
            "key": {
                "session_id": 303
            },
            "snapshot": {
                "session_id": 303,
                "class_group_id": 101,
                "room_id": 201,
                "subject": "English",
                "starts_at": "2026-11-16T11:00:00+00:00",
                "ends_at": "2026-11-16T12:00:00+00:00",
                "status": "cancelled"
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
    },
    {
        "_id": "event_000006",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "session_rescheduled",
        "occurredAt": ISODate("2030-01-01T10:05:00Z"),
        "source": {
            "entity": "lesson_session",
            "key": {
                "session_id": 303
            },
            "snapshot": {
                "session_id": 303,
                "class_group_id": 101,
                "room_id": 201,
                "subject": "English",
                "starts_at": "2026-11-16T11:00:00+00:00",
                "ends_at": "2026-11-16T12:00:00+00:00",
                "status": "cancelled"
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
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "examples": {
                "change_reason": "illustrative change_reason",
                "equipment_notes": "illustrative equipment_notes",
                "previous_starts_at": "illustrative previous_starts_at"
            }
        }
    }
]));
  await db.getCollection("lesson_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("lesson_events").find({"eventType":"session_scheduled"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("lesson_events").find({"source.key.session_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("lesson_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("lesson_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("lesson_events").insertOne({...{
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
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("lesson_events").insertOne({
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
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("lesson_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
