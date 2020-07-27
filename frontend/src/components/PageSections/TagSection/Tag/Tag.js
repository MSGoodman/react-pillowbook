import React from 'react';
import './Tag.css';
import { Link } from 'react-router-dom';

function Tag(props) {
    return (
        <Link to={`/nodes/${props.node_uuid}`} className="Tag">
            {props.name}
        </Link>
    );
}

export default Tag;
