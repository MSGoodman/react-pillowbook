var express = require('express');
var router = express.Router();
var db = require("../db/database");
sessionQueries = require('../db/queries/sessions');

// Get types
router.get('/', function (req, res, next) {
  const dayStart = new Date(new Date(req.query.date).setHours(0, 0, 0, 0)).getTime() / 1000;
  const dayEnd = new Date(new Date(req.query.date).setHours(24, 0, 0, 0)).getTime() / 1000;

  var sql = sessionQueries.getSessionsForDay;
  var params = [dayStart, dayEnd]

  console.log([new Date(new Date(req.query.date).setHours(0, 0, 0, 0)), new Date(new Date(req.query.date).setHours(24, 0, 0, 0))])
  console.log(params);

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// New session
router.post('/', function (req, res, next) {
  var params = [req.body.node_id, req.body.rating, req.body.start_time, req.body.end_time]
  db.run(sessionQueries.insertSession, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});


module.exports = router;
