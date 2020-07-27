import React from 'react';
import './Review.css';
import moment from 'moment';
import Stars from '../../../Stars/Stars';

function Review(props) {
    console.log(props.rating)
    return (
        <div className="Review">
            <Stars rating={props.rating}></Stars>
            <span className="date">{moment.unix(props.created_at).format("YYYY-MM-DD")}</span>
            <span className="title">{props.review_name}</span>
            <div className="reviewText">
                {props.markdown_content}
            </div>
        </div>
    );
}

export default Review;
