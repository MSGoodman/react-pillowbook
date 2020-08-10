const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const insertImageNodeFixtures =
    `INSERT INTO node(node_uuid,name,type,markdown_content,horizontal_image_node,vertical_image_node) 
VALUES 
    ('HZDimageHori', 'HZDimageHori.jpg', 'FILE',null,null,null),
    ('HZDimageVert', 'HZDimageVert.jpg', 'FILE',null,null,null);`;

const insertImageFileFixtures =
    `INSERT INTO file(file_node,file_extension) 
VALUES 
    ((SELECT node_id FROM node WHERE node_uuid='HZDimageHori'), 'png'),
    ((SELECT node_id FROM node WHERE node_uuid='HZDimageVert'), 'jpg');`;

const updateHorizonWithImages =
    `UPDATE node
SET horizontal_image_node = (SELECT node_id FROM node WHERE node_uuid='HZDimageHori'), 
vertical_image_node = (SELECT node_id FROM node WHERE node_uuid='HZDimageVert')
WHERE node_uuid='HorizonZeroDawn'`;

const migrations = [insertImageNodeFixtures, insertImageFileFixtures, updateHorizonWithImages];
util.migrate(migrations, migrationPath);
