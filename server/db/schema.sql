CREATE TABLE users (
  id integer NOT NULL,
  json jsonb,
  "createdAt" timestamp without time zone,
  "updatedAt" timestamp without time zone,
  PRIMARY KEY (id)
);

CREATE TABLE activities (
  id integer NOT NULL,
  "userId" integer,
  json jsonb,
  "createdAt" timestamp without time zone,
  "updatedAt" timestamp without time zone,
  PRIMARY KEY (id),
  FOREIGN KEY ("userId") REFERENCES users(id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
) WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;