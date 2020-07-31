import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReviewPage.scss'

function ReviewPage() {

    const [nodes, setNodes] = useState([]);

    const nodeLinks = nodes.map((t, i) =>
        <Link to={`/nodes/${t.node_uuid}`}>{t.name}</Link>)

    useEffect(() => {
        fetch(`http://localhost:9000/nodes`)
            .then(res => res.json())
            .then(data => setNodes(data))
    }, []);

    return (
        <div className="ReviewPage">
            {nodeLinks}
        </div>
    );
}

export default ReviewPage;
