import React, { useState, useEffect } from 'react';
import './ArtPage.css';
import InfoSection from '../InfoSection/InfoSection';
import TagSection from '../TagSection/TagSection';
import ReviewSection from '../RatingSection/RatingSection';
import SessionSection from '../SessionSection/SessionSection';

function ArtPage(props) {
    const [node, setNode] = useState({});
    useEffect(() => {
        fetch("http://localhost:9000/nodes/HorizonZeroDawn")
            .then(res => res.json())
            .then(data => setNode(data))
    }, []);

    const [children, setChildren] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/nodes/HorizonZeroDawn/children")
            .then(res => res.json())
            .then(data => setChildren(data))
    }, []);


    return (
        <div className="ArtPage">
            <TagSection tags={children.filter(child => child.relation_type === 'TAG')}></TagSection>
            <InfoSection name={node.name} imagefilename={props.item.imagefilename}
                details={children.filter(child => child.relation_type === 'DETAIL')}
                contributors={children.filter(child => child.relation_type === 'CONTRIBUTOR')}></InfoSection>
            <ReviewSection reviews={props.reviews}></ReviewSection>
            <SessionSection sessions={props.sessions}></SessionSection>
        </div>
    );
}

export default ArtPage;
