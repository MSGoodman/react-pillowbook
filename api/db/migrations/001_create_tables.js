const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createNodeTypeTable =
    `CREATE TABLE node_type (
    name TEXT PRIMARY KEY NOT NULL,
    icon TEXT
);`;

const createNodeTable = `CREATE TABLE node (
    node_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    type TEXT NOT NULL REFERENCES node_type(type)
);`;

const createRelationTypeTable =
    `CREATE TABLE relation_type (
    name TEXT PRIMARY KEY NOT NULL
);`;

const createRelationTable = `CREATE TABLE relation (
    parent INTEGER NOT NULL REFERENCES node(parent),
    child INTEGER NOT NULL REFERENCES node(child),
    name TEXT, 
    type TEXT NOT NULL REFERENCES relation_type(type)
);`;

const migrations = [createNodeTypeTable, createNodeTable, createRelationTypeTable, createRelationTable];
util.migrate(migrations, migrationPath);
