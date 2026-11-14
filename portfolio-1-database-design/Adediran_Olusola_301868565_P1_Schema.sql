-- Bay Secondary School lesson scheduling: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."class_group" (
  "class_group_id" bigint NOT NULL,
  "group_code" text NOT NULL,
  "year_level" bigint NOT NULL,
  "active" boolean NOT NULL,
  CONSTRAINT "pk_class_group" PRIMARY KEY ("class_group_id"),
  CONSTRAINT "uq_class_group_0" UNIQUE ("group_code")
);
CREATE TABLE portfolio."room" (
  "room_id" bigint NOT NULL,
  "room_code" text NOT NULL,
  "capacity" bigint NOT NULL,
  "accessible" boolean NOT NULL,
  CONSTRAINT "pk_room" PRIMARY KEY ("room_id"),
  CONSTRAINT "uq_room_0" UNIQUE ("room_code")
);
CREATE TABLE portfolio."lesson_session" (
  "session_id" bigint NOT NULL,
  "class_group_id" bigint NOT NULL,
  "room_id" bigint NOT NULL,
  "subject" text NOT NULL,
  "starts_at" timestamptz NOT NULL,
  "ends_at" timestamptz NOT NULL,
  "status" text NOT NULL,
  CONSTRAINT "pk_lesson_session" PRIMARY KEY ("session_id")
);
ALTER TABLE portfolio."lesson_session" ADD CONSTRAINT "fk_lesson_session_0" FOREIGN KEY ("class_group_id") REFERENCES portfolio."class_group" ("class_group_id");
ALTER TABLE portfolio."lesson_session" ADD CONSTRAINT "fk_lesson_session_1" FOREIGN KEY ("room_id") REFERENCES portfolio."room" ("room_id");
ALTER TABLE portfolio."class_group" ADD CONSTRAINT "group_year_range" CHECK (("year_level" >= 7) AND ("year_level" <= 12));
ALTER TABLE portfolio."room" ADD CONSTRAINT "room_capacity_positive" CHECK ("capacity" > 0);
ALTER TABLE portfolio."lesson_session" ADD CONSTRAINT "session_time_order" CHECK ("ends_at" > "starts_at");
ALTER TABLE portfolio."lesson_session" ADD CONSTRAINT "session_status_valid" CHECK (("status" = 'scheduled') OR ("status" = 'cancelled'));
CREATE UNIQUE INDEX "session_room_start_unique" ON portfolio."lesson_session" ("room_id", "starts_at") WHERE ("status" = 'scheduled');
COMMIT;
