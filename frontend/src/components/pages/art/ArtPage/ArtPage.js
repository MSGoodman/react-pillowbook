import React from 'react';
import './ArtPage.css';
import InfoSection from '../InfoSection/InfoSection';
import TagSection from '../TagSection/TagSection';
import ReviewSection from '../RatingSection/RatingSection';
import SessionSection from '../SessionSection/SessionSection';

function ArtPage(props) {
    const contributors = props.relations.filter(r => r.relationType === "Contributor");
    const details = props.relations.filter(r => r.relationType === "Detail");
    const tags = props.relations.filter(r => r.relationType === "Tag");

    return (
        <div className="ArtPage">
            <TagSection tags={tags}></TagSection>
            <InfoSection name={props.item.name} imagefilename={props.item.imagefilename}
                details={details} contributors={contributors}></InfoSection>
            <ReviewSection reviews={props.reviews}></ReviewSection>
            <SessionSection sessions={props.sessions}></SessionSection>
        </div>
    );
}

export default ArtPage;
