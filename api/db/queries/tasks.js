
const insertTask =
  `INSERT INTO task(task_node, category_node, status, priority, due_date) 
VALUES (?, ?, ?, ?, ?);`;

const updateTask =
  `UPDATE task 
SET category_node = ?, status = ?, priority = ?, rank = ?, due_date = ?
WHERE task_uuid = ?`;

const getTaskByUUID =
  `SELECT t.*, p.name, p.node_uuid AS parent_node_uuid
FROM session t
LEFT JOIN relation r ON s.session_node = r.child
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node_type pnt ON p.type = nt.name
LEFT JOIN node c ON p.node_id = t.category_node
LEFT JOIN category_node_type cnt ON c.type = cnt.name
WHERE t.task_uuid = ?`

const getTasksByStatus =
  `SELECT t.*, p.name, p.node_uuid AS parent_node_uuid
FROM session t
LEFT JOIN relation r ON s.session_node = r.child
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node_type pnt ON p.type = nt.name
LEFT JOIN node c ON p.node_id = t.category_node
LEFT JOIN category_node_type cnt ON c.type = cnt.name
WHERE t.status = ?`

module.exports = { insertTask, updateTask, getTaskByUUID, getTasksByStatus }