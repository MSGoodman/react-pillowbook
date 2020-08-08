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

function createFile(node_id, file_extension) {
    return fetch(`http://localhost:9000/files/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            node_id: node_id,
            file_extension: file_extension
        })
    });
}

module.exports = { createNodeOrIgnore, createRelation, createReview, createFile }