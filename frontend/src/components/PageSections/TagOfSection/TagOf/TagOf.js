import React from 'react';
import './TagOf.css';
import Stars from '../../../Stars/Stars';
import { Link } from 'react-router-dom';

function TagOf(props) {
    return (
        <li className="TagOf">
            <Link to={`/nodes/${props.parent_node_uuid}`}>
                {props.parent_name}
            </Link>
        </li>
    );
}

export default TagOf;
