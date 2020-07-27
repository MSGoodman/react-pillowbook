import React from 'react';
import './Tag.css';

function Tag(props) {
    return (
        <div className="Tag">
            {props.name}
        </div>
    );
}

export default Tag;
