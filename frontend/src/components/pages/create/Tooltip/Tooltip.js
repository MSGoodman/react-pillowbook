import React from 'react';
import './Tooltip.css'

function Tooltip(props) {
    return (
        <span className="Tooltip">{props.text}</span>
    );
}

export default Tooltip;