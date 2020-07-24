import React from 'react';
import './ArtRelationship.css';

function ArtRelationship(props) {
    const icon = props.icon ? <i class={props.icon}></i> : null;

    return (
        <div className="ArtRelationship">
            <b className="relationName">{props.relationName}:</b> <span className="itemName"> {icon} {props.itemName} </span>
        </div>
    );
}

export default ArtRelationship;
