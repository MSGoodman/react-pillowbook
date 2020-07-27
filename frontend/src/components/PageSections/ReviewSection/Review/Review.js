import React from 'react';
import './Review.css';
import moment from 'moment';
import Stars from '../../../Stars/Stars';
import { Link } from 'react-router-dom';

function Review(props) {
    return (
        <div className="Review">
            <Link to={`/nodes/${props.node_uuid}`} className="reviewHeader">
                <Stars rating={props.rating}></Stars>
                <span className="date">{moment.unix(props.created_at).format("YYYY-MM-DD")}</span>
                <span className="title">{props.review_name}</span>
            </Link>
            <div className="reviewText">
                {props.markdown_content}
            </div>
        </div>
    );
}

export default Review;
