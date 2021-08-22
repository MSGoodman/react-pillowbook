const getSessionsForDay =
  `SELECT s.*, p.name, t.icon, p.node_uuid AS parent_node_uuid
FROM session s
LEFT JOIN relation r ON s.session_node = r.child
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node_type t ON p.type = t.name
WHERE (start_time > ? OR end_time IS NULL)
AND start_time < ? 
ORDER BY start_time;`;

const updateSession =
  `UPDATE session 
SET rating = ?, start_time = ?, end_time = ?, scheduled = ?
WHERE session_uuid = ?`;

const getSessionByUUID =
  `SELECT SELECT s.*, p.name, t.icon, p.node_uuid AS parent_node_uuid
FROM session s
LEFT JOIN relation r ON s.session_node = r.child
LEFT JOIN node p ON p.node_id = r.parent
LEFT JOIN node_type t ON p.type = t.name
WHERE s.session_uuid = ?`

const insertSession = `INSERT INTO session(session_node,rating,start_time,end_time) VALUES (?, ?, ?, ?);`;

module.exports = { getSessionsForDay, insertSession, updateSession, getSessionByUUID }