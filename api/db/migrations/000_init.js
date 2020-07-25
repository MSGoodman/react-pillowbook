const db = require('../database');
const path = require('path');
const migrationFilename = path.basename(__filename);
const util = require('../utils/migration_utils');

const createMigrations =
    `CREATE TABLE migrations (
    name TEXT PRIMARY KEY NOT NULL
);`;

function checkIfFirstMigrationHasRun() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='migrations';`,
            (err, row) => {
                if (err) { reject(err); }
                else { resolve(row.length > 0) }
            });
    });
}

function createMigrationsTable(alreadyExists) {
    if (alreadyExists) { console.log("Migration ".concat(migrationFilename).concat(" has already run. Skipping.")); }
    else {
        console.log("Running migration ".concat(migrationFilename));

        db.serialize(() => {
            db.run(createMigrations);
            util.markMigrationAsRun(migrationFilename);
        });
    }
}

checkIfFirstMigrationHasRun().then(createMigrationsTable);

