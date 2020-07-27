import React from 'react';
import './Detail.css';

function Detail(props) {
    const icon = props.icon ? <i className={props.icon}></i> : null;

    return (
        <span className="Detail">
            <b className="relationName">{props.relation}:</b> <span className="itemName"> {icon} {props.name} </span>
        </span>
    );
}

export default Detail;
