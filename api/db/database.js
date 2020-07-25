const path = require('path')
const dbPath = path.resolve(__dirname, 'pillowbook.sqlite')
const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) { console.error(err.message) }
    console.log("Starting up database")
});

module.exports = db