import React from 'react';
import './Stars.css';


function Stars(props) {
    let starlist = [];
    for (let i = 1; i <= 5; i++) {
        if (props.rating >= i) {
            starlist.push(<i class="fas fa-star"></i>);
        }
        else {
            starlist.push(<i class="far fa-star"></i>);
        }
    }

    return (
        <div className="Stars"> {starlist} </div>
    );
}

export default Stars;
