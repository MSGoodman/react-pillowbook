const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const sessionFixtures =
    `INSERT INTO session(session_node,rating,start_time,end_time) 
VALUES 
( (SELECT node_id FROM node WHERE node_uuid='HZD021019SESSION'), 5, 1550224800, 1550237400),
( (SELECT node_id FROM node WHERE node_uuid='HZD021119SESSION'), 3, 1550340000, 1550354400),
( (SELECT node_id FROM node WHERE node_uuid='HZD021219SESSION'), 1, 1550415600, 1550417400),
( (SELECT node_id FROM node WHERE node_uuid='BKT070220SESSION'), 3, 1593676800, 1593678600),
( (SELECT node_id FROM node WHERE node_uuid='SHW070220SESSION'), null, 1593678600, 1593680400),
( (SELECT node_id FROM node WHERE node_uuid='HZD070220SESSION'), 4, 1593680400, 1593686700),
( (SELECT node_id FROM node WHERE node_uuid='RVW070220SESSION'), null, 1593686700, 1593687600),
( (SELECT node_id FROM node WHERE node_uuid='STD070220SESSION'), 3, 1593687600, 1593689400),
( (SELECT node_id FROM node WHERE node_uuid='TK1070220SESSION'), 4, 1593689400, 1593694800),
( (SELECT node_id FROM node WHERE node_uuid='LCH070220SESSION'), 4, 1593694800, 1593696600),
( (SELECT node_id FROM node WHERE node_uuid='TK2070220SESSION'), 1, 1593696600, 1593700200);`;

const migrations = [sessionFixtures];
util.migrate(migrations, migrationPath);
