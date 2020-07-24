import React from 'react';
import './RatingSection.css';
import Rating from './Rating/Rating';
import SubsectionNewButton from '../../../SubsectionNewButton/SubsectionNewButton';

function RatingSection(props) {
    const reviews = props.reviews.map((r) => <Rating key={r.id} rating={r.rating} date={r.date} text={r.text}></Rating>);

    return (
        <div className="RatingSection">
            <h1>Reviews</h1>
            {reviews}
            <SubsectionNewButton></SubsectionNewButton>
        </div>
    );
}

export default RatingSection;
