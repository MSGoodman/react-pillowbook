import React from 'react';
import './Contributor.css';
import { Link } from 'react-router-dom';

function Contributor(props) {
    const icon = props.icon ? <i className={props.icon}></i> : null;

    return (
        <Link to={`/nodes/${props.node_uuid}`} className="Contributor">
            <b className="relationName">{props.relation}:</b> <span className="itemName"> {icon} {props.name} </span>
        </Link>
    );
}

export default Contributor;
