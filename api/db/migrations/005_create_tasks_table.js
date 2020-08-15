const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createTaskStatusTable =
    `CREATE TABLE task_status (
    task_status_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    name TEXT PRIMARY KEY NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const createTaskPriorityTable =
    `CREATE TABLE task_priority (
    task_priority_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    name TEXT PRIMARY KEY NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const createTaskTable =
    `CREATE TABLE task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    task_node INTEGER NOT NULL REFERENCES node(task_node),
    category_node INTEGER REFERENCES node(category_node),
    status TEXT NOT NULL DEFAULT 'TODO' REFERENCES task_status(status),
    priority TEXT NOT NULL DEFAULT 'MEDIUM' REFERENCES task_priority(priority),
    rank REAL,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    due_date INTEGER
);`;

const createTaskTrigger =
    `CREATE TRIGGER set_new_task_rank
    AFTER INSERT ON task
    FOR EACH ROW
    WHEN (NEW.rank IS NULL)
    BEGIN
        UPDATE task SET rank = NEW.rowid WHERE rowid = NEW.rowid;
    END;
);`;


const migrations = [createTaskStatusTable, createTaskPriorityTable, createTaskTable, createTaskTrigger];
util.migrate(migrations, migrationPath);
