const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const insertRelationTypes =
    `INSERT INTO relation_type(name) 
VALUES 
('DETAIL'),
('COMPONENT'),
('CONTRIBUTOR'),
('TAG'),
('SESSION'),
('REVIEW'),
('INSTANCE'),
('SOURCE'),
('ATTACHMENT'),
('ADAPTATION')`;

const migrations = [insertRelationTypes];
util.migrate(migrations, migrationPath);
