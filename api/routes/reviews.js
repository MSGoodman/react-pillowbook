var express = require('express');
var router = express.Router();
var db = require("../db/database");
var knex = require('../db/knex');
reviewQueries = require("../db/queries/reviews");


// New relation
router.post('/', function (req, res, next) {
  var params = [req.body.node_id, req.body.rating]
  console.log(reviewQueries.insertReview);
  console.log(params);
  db.run(reviewQueries.insertReview, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});


module.exports = router;
