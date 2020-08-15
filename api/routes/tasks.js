var express = require('express');
var router = express.Router();
var db = require("../db/database");
var knex = require('../db/knex');
taskQueries = require("../db/queries/tasks");

// Get tasks
router.get('/', function (req, res, next) {
  const status = req.query.status ? req.query.status : 'TODO';

  var sql = taskQueries.getTasksByStatus;
  var params = [status]

  db.all(sql, params, (err, rows) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(rows)
  });
});

// New task
router.post('/', function (req, res, next) {
  var params = [req.body.task_node, req.body.category_node, req.body.status, req.body.priority, req.body.due_date]
  db.run(taskQueries.insertTask, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});

// Update task
router.post('/:task', function (req, res, next) {
  console.log(req.body)
  var params = [req.body.category_node, req.body.status, req.body.priority, req.body.rank, req.body.due_date, req.body.task_uuid];

  db.serialize(() => {
    db.run(taskQueries.updateTask, params, (err, row) => {
      if (err) { res.status(400).json({ "error": err.message }); return; }
    });
    db.get(taskQueries.getTaskByUUID, [req.body.session_uuid], (err, row) => {
      if (err) { res.status(400).json({ "error": err.message }); return; }
      res.json(row)
    });
  });
});

module.exports = router;
