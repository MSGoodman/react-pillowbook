import React from 'react';
import './ReviewSection.css';
import Review from './Review/Review';
import SubsectionNewButton from '../../SubsectionNewButton/SubsectionNewButton';

function ReviewSection(props) {
    const reviews = props.reviews.map((r) =>
        <Review key={"review" + r.node_uuid} review_name={r.review_name} rating={r.rating} created_at={r.created_at} markdown_content={r.markdown_content} node_uuid={r.node_uuid}></Review>);

    return (
        <div className="ReviewSection">
            <h1>Reviews</h1>
            {reviews}
            <div className="buttonSection">
                <SubsectionNewButton clickFunction={props.clickFunction}></SubsectionNewButton>
            </div>
        </div>
    );
}

export default ReviewSection;
