const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const insertImageFixtures =
    `INSERT INTO node(node_uuid,name,type,markdown_content,horizontal_image_node,vertical_image_node) 
VALUES 
    ('HZDimageHori', 'HZDimageHori.jpg', 'IMAGE',null,null,null),
    ('HZDimageVert', 'HZDimageVert.jpg', 'IMAGE',null,null,null);`;

const updateHorizonWithImages =
    `UPDATE node
SET horizontal_image_node = (SELECT node_id FROM node WHERE node_uuid='HZDimageHori'), 
vertical_image_node = (SELECT node_id FROM node WHERE node_uuid='HZDimageVert')
WHERE node_uuid='HorizonZeroDawn'`;

const migrations = [insertImageFixtures, updateHorizonWithImages];
util.migrate(migrations, migrationPath);
