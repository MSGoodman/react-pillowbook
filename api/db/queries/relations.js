const insertRelationOrIgnore = `INSERT OR IGNORE INTO relation(parent,child,name,type) 
VALUES (
  (SELECT node_id FROM node WHERE name=?), 
  (SELECT node_id FROM node WHERE name=?),
  ?, ?);`;

module.exports = { insertRelationOrIgnore }