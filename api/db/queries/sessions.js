const getSessionsForDay =
  `SELECT s.*, p.name 
FROM session s
LEFT JOIN relation r ON s.session_node = r.child
LEFT JOIN node p ON p.node_id = r.parent
WHERE start_time > ?
AND end_time < ?
ORDER BY start_time;`;

const insertSession = `INSERT INTO session(session_node,rating,start_time,end_time) VALUES (?, ?, ?, ?);`;

module.exports = { getSessionsForDay, insertSession }