const fs = require('fs');
const exec = require('child_process').exec;
const async = require('async');
const migrationsDir = '../migrations/';

const files = fs.readdirSync(migrationsDir);
const funcs = files.map(file => exec.bind(null, `node ${migrationsDir}${file}`));

function getResults(err, data) {
    if (err) { return console.log(err); }
    data.map(out => { console.log(out[0]); })
}

async.series(funcs, getResults)