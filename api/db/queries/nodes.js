const getNodeByName = `SELECT n.*, t.icon, h.node_uuid AS horizontal_image, v.node_uuid AS vertical_image
FROM node n
LEFT JOIN node_type t ON n.type = t.name
LEFT JOIN node h ON h.node_id = n.horizontal_image_node
LEFT JOIN node v ON v.node_id = n.vertical_image_node
WHERE n.name = ?`;

const getNodeByUUID = `SELECT n.*, t.icon, h.node_uuid AS horizontal_image_uuid, hf.file_extension AS horizontal_image_extension, v.node_uuid AS vertical_image_uuid, vf.file_extension AS vertical_image_extension
FROM node n
LEFT JOIN node_type t ON n.type = t.name
LEFT JOIN node h ON h.node_id = n.horizontal_image_node
LEFT JOIN file hf ON h.node_id = hf.file_node
LEFT JOIN node v ON v.node_id = n.vertical_image_node
LEFT JOIN file vf ON v.node_id = vf.file_node
WHERE n.node_uuid = ?`;

const insertNodeOrIgnore = `INSERT OR IGNORE INTO node(name,type,markdown_content) 
VALUES (?,?,?)`;

const getNodeChildrenByParentUUID = `SELECT p.node_uuid AS parent_node_uuid, c.node_id, c.name, c.type, c.created_at, r.name AS relation, r.type AS relation_type, t.icon, c.markdown_content, c.node_uuid, rv.rating AS review_rating, s.rating AS session_rating, s.start_time AS session_start, s.end_time AS session_end, f.file_extension
FROM relation r
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node c ON c.node_id = r.child
LEFT JOIN node_type t ON c.type = t.name
LEFT JOIN review rv ON rv.review_node = c.node_id
LEFT JOIN session s ON s.session_node = c.node_id
LEFT JOIN file f ON f.file_node = c.node_id
WHERE p.node_uuid = ?`;

const getNodeChildrenByParentUUIDAndRelationType = `SELECT p.node_uuid AS parent_node_uuid, c.name AS name, c.type AS type , r.name AS relation, r.type AS relation_type, t.icon, c.markdown_content, c.node_uuid
FROM relation r
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node c ON c.node_id = r.child
LEFT JOIN node_type t ON c.type = t.name
WHERE p.node_uuid = ?`;

const getNodeParentsByChildUUIDAndRelationType = `SELECT p.node_uuid AS parent_node_uuid, p.name AS parent_name, p.type AS parent_type , r.name AS relation, r.type AS relation_type, t.icon
FROM relation r
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node c ON c.node_id = r.child
LEFT JOIN node_type t ON c.type = t.name
WHERE c.node_uuid = ? AND r.type = ?`;

const getAllNodeNamesAndUUIDs = `SELECT node_uuid, name FROM node`;
const updateNode =
    `UPDATE node 
SET name = ?, type = ?, markdown_content = ?, horizontal_image_node = ?, vertical_image_node = ?
WHERE node_uuid = ?`;

const getAllNodesByType =
    `SELECT n.*, t.icon, h.node_uuid AS horizontal_image_uuid, hf.file_extension AS horizontal_image_extension, v.node_uuid AS vertical_image_uuid, vf.file_extension AS vertical_image_extension
FROM node n
LEFT JOIN node_type t ON n.type = t.name
LEFT JOIN node h ON h.node_id = n.horizontal_image_node
LEFT JOIN file hf ON h.node_id = hf.file_node
LEFT JOIN node v ON v.node_id = n.vertical_image_node
LEFT JOIN file vf ON v.node_id = vf.file_node
WHERE n.type = ?`

const getAllNodes =
    `SELECT n.*, t.icon, h.node_uuid AS horizontal_image_uuid, hf.file_extension AS horizontal_image_extension, v.node_uuid AS vertical_image_uuid, vf.file_extension AS vertical_image_extension
FROM node n
LEFT JOIN node_type t ON n.type = t.name
LEFT JOIN node h ON h.node_id = n.horizontal_image_node
LEFT JOIN file hf ON h.node_id = hf.file_node
LEFT JOIN node v ON v.node_id = n.vertical_image_node
LEFT JOIN file vf ON v.node_id = vf.file_node`

module.exports = {
    getNodeByName, getNodeByUUID, getAllNodes,
    insertNodeOrIgnore,
    getNodeChildrenByParentUUID, getNodeChildrenByParentUUIDAndRelationType,
    getNodeParentsByChildUUIDAndRelationType,
    getAllNodeNamesAndUUIDs, getAllNodesByType,
    updateNode
}