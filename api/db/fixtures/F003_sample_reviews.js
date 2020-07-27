const migrationPath = require('path').basename(__filename);
const util = require('../utils/migration_utils');

const reviewFixtures =
    `INSERT INTO review(review_node,rating) 
VALUES 
( (SELECT node_id FROM node WHERE node_uuid='LoremIpsum'), 3),
( (SELECT node_id FROM node WHERE node_uuid='PolygonReview'), 5),
( (SELECT node_id FROM node WHERE node_uuid='IForgotThatYouExisted1stReview'), 4),
( (SELECT node_id FROM node WHERE node_uuid='CruelSummer1stReview'), 4),
( (SELECT node_id FROM node WHERE node_uuid='Lover1stReview'), 3),
( (SELECT node_id FROM node WHERE node_uuid='TheMan1stReview'), 5),
( (SELECT node_id FROM node WHERE node_uuid='LoverAlbumReview'), 2);`;

const migrations = [reviewFixtures];
util.migrate(migrations, migrationPath);
