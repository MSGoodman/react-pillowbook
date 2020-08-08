import React from 'react';
import './Review.css';
import moment from 'moment';
import Stars from '../../Stars/Stars';
import { Link } from 'react-router-dom';

function Review(props) {
    return (
        <div className="Review">
            <Link to={`/nodes/${props.node.node_uuid}`} className="reviewHeader">
                <Stars rating={props.node.review_rating}></Stars>
                <span className="date">{moment.unix(props.node.created_at).format("YYYY-MM-DD")}</span>
                <span className="title">{props.node.name}</span>
            </Link>
            <div className="reviewText">
                {props.node.markdown_content}
            </div>
        </div>
    );
}

export default Review;
