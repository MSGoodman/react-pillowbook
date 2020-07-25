import React, { useState, useEffect } from 'react';
import './ArtPage.css';
import InfoSection from '../InfoSection/InfoSection';
import TagSection from '../TagSection/TagSection';
import ReviewSection from '../RatingSection/RatingSection';
import SessionSection from '../SessionSection/SessionSection';

function ArtPage(props) {
    const [tags, setTags] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/nodes/HorizonZeroDawn/tags")
            .then(res => res.json())
            .then(data => setTags(data))
    }, []);

    const [details, setDetails] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/nodes/HorizonZeroDawn/details")
            .then(res => res.json())
            .then(data => setDetails(data))
    }, []);

    const [contributors, setContributors] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/nodes/HorizonZeroDawn/contributors")
            .then(res => res.json())
            .then(data => setContributors(data))
    }, []);

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
