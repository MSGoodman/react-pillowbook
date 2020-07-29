const path = require('path')
const dbPath = path.resolve(__dirname, 'pillowbook.sqlite')

var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath
  }
});

module.exports = knex;