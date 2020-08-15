const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const insertTaskStatuses =
    `INSERT INTO task_status(name) 
VALUES 
('TODO'),
('INPROGRESS'),
('COMPLETE'),
('BLOCKED'),
('INREVIEW'),
('WONTDO')`;

const insertTaskPriorities =
    `INSERT INTO task_priority(name) 
VALUES 
('LOW'),
('MEDIUM'),
('HIGH'),
('URGENT')`;

const migrations = [insertTaskStatuses, insertTaskPriorities];
util.migrate(migrations, migrationPath);
