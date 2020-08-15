import React, { useState } from 'react';
import './ReviewSection.css';
import Review from './Review/Review';
import SubsectionNewButton from '../../SubsectionNewButton/SubsectionNewButton';
import NewNodeModal from '../../NewNodeModal/NewNodeModal';

function ReviewSection(props) {
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);

    const reviews = props.reviews.map((r) =>
        <Review key={"review" + r.node_uuid} review_name={r.review_name} rating={r.rating} created_at={r.created_at} markdown_content={r.markdown_content} node_uuid={r.node_uuid}></Review>);

    return (
        <div className="ReviewSection">
            <h1>Reviews</h1>
            {reviews}
            <div className="buttonSection">
                <SubsectionNewButton clickFunction={() => setIsNewNodeModalOpen(true)} relationName="Review"></SubsectionNewButton>
            </div>

            <NewNodeModal isOpen={isNewNodeModalOpen} close={() => setIsNewNodeModalOpen(false)}
                name="" type='REVIEW' parentNodeUUID={props.parentNode.node_uuid} parentName={props.parentNode.name} relationName={'Review'} relationType='REVIEW' hideNodeType={true}></NewNodeModal>

        </div>
    );
}

export default ReviewSection;
