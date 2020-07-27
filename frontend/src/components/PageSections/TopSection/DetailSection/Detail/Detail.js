import React from 'react';
import './Detail.css';
import { Link } from 'react-router-dom';

function Detail(props) {
    const icon = props.icon ? <i className={props.icon}></i> : null;

    return (
        <Link to={`/nodes/${props.node_uuid}`} className="Detail">
            <b className="relationName">{props.relation}:</b> <span className="itemName"> {icon} {props.name} </span>
        </Link>
    );
}

export default Detail;
