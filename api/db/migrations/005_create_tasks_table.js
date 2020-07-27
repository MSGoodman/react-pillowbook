const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createTaskTable =
    `CREATE TABLE task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    task_node INTEGER NOT NULL REFERENCES node(review_node),
    finished BOOLEAN DEFAULT (0) CHECK (finished IN(0,1)),
    category_node INTEGER REFERENCES node(review_node),
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const migrations = [createTaskTable];
util.migrate(migrations, migrationPath);
