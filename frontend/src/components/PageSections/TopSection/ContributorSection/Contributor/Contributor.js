import React from 'react';
import './Contributor.css';

function Contributor(props) {
    const icon = props.icon ? <i className={props.icon}></i> : null;

    return (
        <div className="Contributor">
            <b className="relationName">{props.relation}:</b> <span className="itemName"> {icon} {props.name} </span>
        </div>
    );
}

export default Contributor;
