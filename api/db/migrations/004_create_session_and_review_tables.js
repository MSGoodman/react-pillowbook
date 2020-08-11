const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createReviewTable =
    `CREATE TABLE review (
    review_id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_uuid TEXT DEFAULT (lower(hex(randomblob(16)))) UNIQUE,
    review_node INTEGER NOT NULL REFERENCES node(review_node),
    rating INTEGER NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    CHECK (rating >= 0 AND rating <= 5)
);`;

const createSessionTable =
    `CREATE TABLE session (
session_id INTEGER PRIMARY KEY AUTOINCREMENT,
session_uuid TEXT DEFAULT (lower(hex(randomblob(16)))) UNIQUE,
session_node INTEGER NOT NULL REFERENCES node(session_node),
rating INTEGER,
start_time INTEGER NOT NULL,
end_time INTEGER,
created_at INTEGER DEFAULT (strftime('%s','now')),
scheduled BOOLEAN NOT NULL DEFAULT 0 CHECK (scheduled IN (0,1)),
CHECK (end_time IS NULL OR start_time < end_time)
);`;

const migrations = [createReviewTable, createSessionTable];
util.migrate(migrations, migrationPath);
