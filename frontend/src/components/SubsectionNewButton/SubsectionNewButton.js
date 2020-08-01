import React from 'react';
import './SubsectionNewButton.scss'

function SubsectionNewButton(props) {
    return (
        <button className="SubsectionNewButton" onClick={props.clickFunction}>
            <i className="fas fa-plus"></i> Add {props.relationName}
        </button>
    );
}

export default SubsectionNewButton;
