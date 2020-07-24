import React from 'react';
import './Stars.css';


function Stars(props) {
    let starlist = [];
    for (let i = 1; i <= 5; i++) {
        let iconType = "far";
        if (props.rating >= i) { iconType = "fas"; }
        starlist.push(<i key={"star" + i} className={iconType + " fa-star"}></i>)
    }

    return (
        <div className="Stars"> {starlist} </div>
    );
}

export default Stars;
