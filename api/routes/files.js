var express = require('express');
var router = express.Router();
var db = require("../db/database");
fileQueries = require("../db/queries/files");


// New relation
router.post('/', function (req, res, next) {
  var params = [req.body.node_id, req.body.file_extension]
  db.run(fileQueries.insertFile, params, (err, row) => {
    if (err) { res.status(400).json({ "error": err.message }); return; }
    res.json(row)
  });
});


module.exports = router;
