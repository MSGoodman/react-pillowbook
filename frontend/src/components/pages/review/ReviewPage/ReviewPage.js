import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ReviewPage.scss'
import ReviewPageTable from './ReviewPageTable/ReviewPageTable';

function ReviewPage() {


    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes`)
            .then(res => res.json())
            .then(data => setNodes(data))
    }, []);

    return (
        <div className="ReviewPage">
            <ReviewPageTable nodes={nodes}>
            </ReviewPageTable>
        </div>
    );
}

export default ReviewPage;
