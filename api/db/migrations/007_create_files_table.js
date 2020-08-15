const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createFileTable =
    `CREATE TABLE file (
    file_id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    file_node INTEGER NOT NULL REFERENCES node(file_node),
    file_extension TEXT NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const migrations = [createFileTable];
util.migrate(migrations, migrationPath);
