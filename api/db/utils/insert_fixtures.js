const fs = require('fs');
const exec = require('child_process').exec;
const async = require('async');
const fixturesDir = '../fixtures/';

const files = fs.readdirSync(fixturesDir);
const funcs = files.map(file => exec.bind(null, `node ${fixturesDir}${file}`));

function getResults(err, data) {
    if (err) { return console.log(err); }
    data.map(out => { console.log(out[0]); })
}

async.series(funcs, getResults)