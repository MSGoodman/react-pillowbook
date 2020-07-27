import React from 'react';
import './ReviewSection.css';
import Review from './Review/Review';
import SubsectionNewButton from '../../SubsectionNewButton/SubsectionNewButton';

function ReviewSection(props) {
    const reviews = props.reviews.map((r) => <Review key={r.id} review_name={r.review_name} rating={r.rating} created_at={r.created_at} markdown_content={r.markdown_content}></Review>);

    return (
        <div className="ReviewSection">
            <h1>Reviews</h1>
            {reviews}
            <SubsectionNewButton></SubsectionNewButton>
        </div>
    );
}

export default ReviewSection;
