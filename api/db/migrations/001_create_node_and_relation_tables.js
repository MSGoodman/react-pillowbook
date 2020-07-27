const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const createNodeTypeTable =
    `CREATE TABLE node_type (
    name TEXT PRIMARY KEY NOT NULL,
    node_type_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    icon TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const createNodeTable = `CREATE TABLE node (
    node_id INTEGER PRIMARY KEY AUTOINCREMENT,
    node_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    name TEXT, 
    type TEXT NOT NULL REFERENCES node_type(type),
    markdown_content TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const createRelationTypeTable =
    `CREATE TABLE relation_type (
    relation_type_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    name TEXT PRIMARY KEY NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const createRelationTable = `CREATE TABLE relation (
    relation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    relation_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    parent INTEGER NOT NULL REFERENCES node(parent),
    child INTEGER NOT NULL REFERENCES node(child),
    name TEXT, 
    type TEXT NOT NULL REFERENCES relation_type(type),
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const migrations = [createNodeTypeTable, createNodeTable, createRelationTypeTable, createRelationTable];
util.migrate(migrations, migrationPath);
