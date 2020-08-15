
const insertTask =
  `INSERT INTO task(task_node, category_node, status, priority, due_date) 
VALUES (?, ?, ?, ?, ?);`;

const updateTask =
  `UPDATE task 
SET category_node = ?, status = ?, priority = ?, rank = ?, due_date = ?
WHERE task_uuid = ?`;

const getTaskByUUID =
  `SELECT t.*, p.name, cnt.icon, p.node_uuid AS parent_node_uuid
FROM task t
LEFT JOIN node p ON p.node_id = t.task_node
LEFT JOIN node_type pnt ON p.type = pnt.name
LEFT JOIN node c ON p.node_id = t.category_node
LEFT JOIN node_type cnt ON c.type = cnt.name
WHERE t.task_uuid = ?`

const getAllTasks =
  `SELECT t.*, p.name, cnt.icon, p.node_uuid AS parent_node_uuid
FROM task t
LEFT JOIN node p ON p.node_id = t.task_node
LEFT JOIN node_type pnt ON p.type = pnt.name
LEFT JOIN node c ON p.node_id = t.category_node
LEFT JOIN node_type cnt ON c.type = cnt.name`

const getTasksByStatus =
  `SELECT t.*, p.name, cnt.icon, p.node_uuid AS parent_node_uuid
FROM task t
LEFT JOIN node p ON p.node_id = t.task_node
LEFT JOIN node_type pnt ON p.type = pnt.name
LEFT JOIN node c ON p.node_id = t.category_node
LEFT JOIN node_type cnt ON c.type = cnt.name
WHERE t.status = ?`

module.exports = { insertTask, updateTask, getTaskByUUID, getTasksByStatus, getAllTasks }