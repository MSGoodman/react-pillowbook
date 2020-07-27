var express = require('express');
var router = express.Router();
var db = require("../db/database");
const { query } = require('express');

function childNodeQuery(all) {
  const sql = `SELECT c.name AS name, c.type AS type , r.name AS relation, r.type AS relation_type, t.icon, c.markdown_content, c.node_uuid
  FROM relation r
  LEFT JOIN node p ON p.node_id = r.parent
  LEFT JOIN node c ON c.node_id = r.child
  LEFT JOIN node_type t ON c.type = t.name
  WHERE p.node_uuid = ?`;

  if (!all) {
    sql.concat(" AND r.type = ?");
  }

  return sql;
}

// Get node
router.get('/:node', function (req, res, next) {
  var sql =
    `SELECT n.*, t.icon, h.node_uuid AS horizontal_image, v.node_uuid AS vertical_image
    FROM node n
    LEFT JOIN node_type t ON n.type = t.name
    LEFT JOIN node h ON h.node_id = n.horizontal_image_node
    LEFT JOIN node v ON v.node_id = n.vertical_image_node
   WHERE n.node_uuid = ?`
  var params = [req.params.node]

  db.get(sql, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});

// Get all children
router.get('/:node/children', function (req, res, next) {
  var sql = childNodeQuery(true)
  var params = [req.params.node]

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get tags
router.get('/:node/tags', function (req, res, next) {
  var sql = childNodeQuery();
  var params = [req.params.node, 'TAG']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get details
router.get('/:node/details', function (req, res, next) {
  var sql = childNodeQuery()
  var params = [req.params.node, 'DETAIL']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get contributors
router.get('/:node/contributors', function (req, res, next) {
  var sql = childNodeQuery()
  var params = [req.params.node, 'CONTRIBUTOR']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get reviews
router.get('/:node/reviews', function (req, res, next) {
  const sql = `SELECT c.name AS review_name, rv.rating, c.markdown_content, c.created_at, c.node_uuid
  FROM node n
  LEFT JOIN relation r ON r.parent = n.node_id
  LEFT JOIN node c ON c.node_id = r.child
  LEFT JOIN review rv ON rv.review_node = r.child
  WHERE r.type = 'REVIEW'
  AND n.node_uuid = ?;`;

  var params = [req.params.node]

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get sessions
router.get('/:node/sessions', function (req, res, next) {
  const sql = `SELECT c.name AS session_name, s.rating, c.markdown_content, s.start_time, s.end_time, c.created_at, c.node_uuid
  FROM node n
  LEFT JOIN relation r ON r.parent = n.node_id
  LEFT JOIN node c ON c.node_id = r.child
  LEFT JOIN session s ON s.session_node = r.child
  WHERE r.type = 'SESSION'
  AND n.node_uuid = ?;`;

  var params = [req.params.node]

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

module.exports = router;
