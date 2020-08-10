var express = require('express');
var router = express.Router();
var db = require("../db/database");
const { query } = require('express');
nodeQueries = require("../db/queries/nodes");

function childNodeQuery(all) {
  const sql = nodeQueries.getNodeChildrenByParentUUID;
  if (!all) { sql.concat(" AND r.type = ?"); }

  return sql;
}

// Add node
router.post('/', function (req, res, next) {
  var params = [req.body.name, req.body.type, req.body.markdown_content];

  db.serialize(() => {
    db.run(nodeQueries.insertNodeOrIgnore, params, (err, row) => {
      if (err) { res.status(400).json({ "error": err.message }); return; }
    });
    db.get(nodeQueries.getNodeByName, [req.body.name], (err, row) => {
      if (err) { res.status(400).json({ "error": err.message }); return; }
      res.json(row)
    });
  });
});

// Get all nodes
router.get('/', function (req, res, next) {
  var sql = 'SELECT *, node_id AS id FROM node';
  var params = []

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get node
router.get('/:node', function (req, res, next) {
  var sql = nodeQueries.getNodeByUUID;
  var params = [req.params.node]

  db.get(sql, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});

// Update node
router.post('/:node', function (req, res, next) {
  var params = [req.body.name, req.body.type, req.body.markdown_content, req.body.horizontal_image_node, req.body.vertical_image_node, req.body.node_uuid];

  db.serialize(() => {
    db.run(nodeQueries.updateNode, params, (err, row) => {
      if (err) { res.status(400).json({ "error": err.message }); return; }
    });
    db.get(nodeQueries.getNodeByName, [req.body.name], (err, row) => {
      if (err) { res.status(400).json({ "error": err.message }); return; }
      res.json(row)
    });
  });
});

// Get all children
router.get('/:node/children', function (req, res, next) {
  var sql = nodeQueries.getNodeChildrenByParentUUID;
  var params = [req.params.node]

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get all parents
router.get('/:node/tagParents', function (req, res, next) {
  var sql = nodeQueries.getNodeParentsByChildUUIDAndRelationType;
  var params = [req.params.node, 'TAG']

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// Get tags
router.get('/:node/tags', function (req, res, next) {
  var sql = nodeQueries.getNodeChildrenByParentUUIDAndRelationType;
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
  var sql = nodeQueries.getNodeChildrenByParentUUIDAndRelationType;
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
