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
