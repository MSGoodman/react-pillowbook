const db = require('../database');

function checkIfMigrationHasRun(filename) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT name FROM migrations WHERE name = ?`,
            filename,
            (err, row) => {
                if (err) { reject(err); }
                else { resolve(row.length > 0) }
            });
    });
}

function markMigrationAsRun(filename) {
    return db.run('INSERT INTO migrations(name) VALUES (?)', filename);
}

function migrate(migrations, migrationFilename) {
    checkIfMigrationHasRun(migrationFilename).then((val) => {
        if (val) { console.log("Migration ".concat(migrationFilename).concat(" has already run. Skipping.")); }
        else {
            console.log("Running migration ".concat(migrationFilename));

            db.serialize(() => {
                for (const migration of migrations) { db.run(migration); }
                markMigrationAsRun(migrationFilename);
            });
        }
    });
}

module.exports = { migrate, markMigrationAsRun }