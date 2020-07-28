var express = require('express');
var router = express.Router();
var db = require("../db/database");

// New relation
router.post('/', function (req, res, next) {
  console.log(req.body);
  var sql =
    `INSERT INTO relation(parent,child,name,type) 
  VALUES (
    (SELECT node_id FROM node WHERE name=?), 
    (SELECT node_id FROM node WHERE name=?),
    ?, ?);`;
  var params = [req.body.parent_node_name, req.body.child_node_name, req.body.relation_name, req.body.relation_type]
  db.run(sql, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});


module.exports = router;
