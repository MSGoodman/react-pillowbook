function createNodeOrIgnore(body) {
    return fetch(`http://localhost:9000/nodes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }).then(res => res.json());
}

function createRelation(parent_name, child_name, relation_name, relation_type) {
    return fetch(`http://localhost:9000/relations/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            parent_node_name: parent_name,
            child_node_name: child_name,
            relation_name: relation_name,
            relation_type: relation_type
        })
    });
}

function createReview(node_id, rating) {
    return fetch(`http://localhost:9000/reviews/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            node_id: node_id,
            rating: rating
        })
    });
}

function createSession(node_id, rating, start_time, end_time) {
    return fetch(`http://localhost:9000/sessions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            node_id: node_id,
            rating: rating,
            start_time: start_time,
            end_time: end_time
        })
    });
}

function createTask(node_id, category_id, status, priority, due_date) {
    return fetch(`http://localhost:9000/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_node: node_id,
            category_node: node_id,
            status: status,
            priority: priority,
            due_date: due_date
        })
    });
}

function createFileRecord(node_id, file_extension) {
    return fetch(`http://localhost:9000/files/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            node_id: node_id,
            file_extension: file_extension
        })
    });
}

function uploadFile(selectedFile, newFilename) {
    const data = new FormData()
    data.append('file', selectedFile, newFilename)
    fetch("http://localhost:9000/upload",
        {
            body: data,
            method: "POST"
        });
}


function updateNode(node, node_uuid, name, type, markdown_content, horizontal_image_node, vertical_image_node) {
    return fetch(`http://localhost:9000/nodes/${node.node_uuid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(node)
    });
}

function updateSession(session) {
    return fetch(`http://localhost:9000/sessions/${session.session_uuid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
    });
}

module.exports = { createNodeOrIgnore, createRelation, createReview, createFileRecord, uploadFile, updateNode, createSession, updateSession, createTask }