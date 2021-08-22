const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createFileTable =
    `ALTER TABLE node
    ADD icon TEXT`;

const migrations = [createFileTable];
util.migrate(migrations, migrationPath);
