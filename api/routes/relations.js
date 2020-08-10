var express = require('express');
var router = express.Router();
var db = require("../db/database");
var knex = require('../db/knex');
relationQueries = require("../db/queries/relations");


// New relation
router.post('/', function (req, res, next) {
  var params = [req.body.parent_node_name, req.body.child_node_name, req.body.relation_name, req.body.relation_type]
  db.run(relationQueries.insertRelationOrIgnore, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});

// Get all relations
router.get('/', function (req, res, next) {
  var sql = 'SELECT parent AS source, child AS target FROM relation';
  var params = []

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});


module.exports = router;
