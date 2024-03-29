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
    node_uuid TEXT DEFAULT (lower(hex(randomblob(16)))) UNIQUE,
    name TEXT NOT NULL UNIQUE, 
    type TEXT NOT NULL REFERENCES node_type(type),
    markdown_content TEXT,
    created_at INTEGER DEFAULT (strftime('%s','now')),
    updated_at INTEGER DEFAULT (strftime('%s','now')),
    horizontal_image_node INTEGER REFERENCES node(horizontal_image_node),
    vertical_image_node INTEGER REFERENCES node(vertical_image_node)
);`;

const createRelationTypeTable =
    `CREATE TABLE relation_type (
    relation_type_uuid TEXT DEFAULT (lower(hex(randomblob(16)))),
    name TEXT PRIMARY KEY NOT NULL,
    created_at INTEGER DEFAULT (strftime('%s','now'))
);`;

const createRelationTable = `CREATE TABLE relation (
    relation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    relation_uuid TEXT DEFAULT (lower(hex(randomblob(16)))) UNIQUE,
    parent INTEGER NOT NULL REFERENCES node(parent),
    child INTEGER NOT NULL REFERENCES node(child),
    name TEXT, 
    type TEXT NOT NULL REFERENCES relation_type(type),
    created_at INTEGER DEFAULT (strftime('%s','now')),
    CONSTRAINT UC_ParentChildName UNIQUE (parent, child, name),
    CONSTRAINT CHK_NoSelf CHECK (parent <> child)
);`;

const createUpdateTrigger =
    `CREATE TRIGGER set_updated_at
    AFTER UPDATE ON node
    FOR EACH ROW
    WHEN NEW.updated_at <= OLD.updated_at
    BEGIN
        UPDATE node SET updated_at = (strftime('%s','now')) WHERE rowid = NEW.rowid;
    END;`;

const migrations = [createNodeTypeTable, createNodeTable, createRelationTypeTable, createRelationTable, createUpdateTrigger];
util.migrate(migrations, migrationPath);
