var express = require('express');
var router = express.Router();
var db = require("../db/database");

// Get types
router.get('/', function (req, res, next) {
  var sql = nodeQueries.getNodeByUUID;
  var params = [req.params.node]

  db.all("SELECT * FROM node_type ORDER BY name", [], (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

module.exports = router;
