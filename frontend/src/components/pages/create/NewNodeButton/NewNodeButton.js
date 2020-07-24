import React, { useState, useEffect } from 'react';
import './NewNodeButton.css'
import Tooltip from '../Tooltip/Tooltip';

function NewNodeButton(props) {
    return (
        <div className="NewNodeButton">
            {props.tooltip ? <Tooltip text={props.tooltip}></Tooltip> : null}
            <i class={props.icon}></i>
            <p>{props.name}</p>
        </div>
    );
}

export default NewNodeButton;