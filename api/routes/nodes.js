var express = require('express');
var router = express.Router();
var db = require("../db/database");

function childNodeQuery() {
  return `SELECT c.name AS tag_name, c.type AS tag_type 
  FROM relation r
  LEFT JOIN node p ON p.node_id = r.parent
  LEFT JOIN node c ON c.node_id = r.child
  WHERE p.unique_id = ?
  AND r.type = ?`
}

// Get node
router.get('/:node', function (req, res, next) {
  var sql =
    `SELECT *
    FROM node n
    WHERE unique_id = ?`
  var params = [req.params.node]

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json({ "message": "success", "data": rows })
  });
});

// Get tags
router.get('/:node/tags', function (req, res, next) {
  var sql = childNodeQuery();
  var params = [req.params.node, 'TAG']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json({ "message": "success", "data": rows })
  });
});

// Get details
router.get('/:node/details', function (req, res, next) {
  var sql = childNodeQuery()
  var params = [req.params.node, 'DETAIL']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json({ "message": "success", "data": rows })
  });
});

// Get contributors
router.get('/:node/contributors', function (req, res, next) {
  var sql = childNodeQuery()
  var params = [req.params.node, 'CONTRIBUTOR']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json({ "message": "success", "data": rows })
  });
});

module.exports = router;
