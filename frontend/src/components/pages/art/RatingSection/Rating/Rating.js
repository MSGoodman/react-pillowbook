import React from 'react';
import './Rating.css';
import Stars from '../../../../Stars/Stars';

function Rating(props) {
    return (
        <div className="Rating">
            <Stars rating={props.rating}></Stars>
            <span className="date">{props.date}</span>
            <div className="reviewText">
                {props.text}
            </div>
        </div>
    );
}

export default Rating;
