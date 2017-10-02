CREATE TABLE users (
    id integer,
    json jsonb,
    PRIMARY KEY (id)
);

CREATE TABLE activities (
    id integer,
    user_id integer,
    json jsonb,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
