import React from 'react';
import './NewNodeButton.css'
import Tooltip from '../Tooltip/Tooltip';

function NewNodeButton(props) {
    return (
        <button className="NewNodeButton" onClick={props.clickFunction}>
            {props.tooltip ? <Tooltip text={props.tooltip}></Tooltip> : null}
            <i className={props.icon}></i>
            <p>{props.name}</p>
        </button>
    );
}

export default NewNodeButton;