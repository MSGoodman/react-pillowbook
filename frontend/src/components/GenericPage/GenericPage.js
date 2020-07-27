import React, { useState, useEffect } from 'react';
import './GenericPage.css';
import TagSection from '../PageSections/TagSection/TagSection';
import TopSection from '../PageSections/TopSection/TopSection';
import ReviewSection from '../PageSections/ReviewSection/ReviewSection';
import SessionSection from '../PageSections/SessionSection/SessionSection';

function GenericPage(props) {
    const uuid = props.match.params.uuid;
    // Expects only one prop, node_uuid, and will make the necessary api calls from here
    const [node, setNode] = useState({});
    const [tags, setTags] = useState([]);
    const [details, setDetails] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [components, setComponents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [attachments, setAttachments] = useState([]);
    const [instances, setInstances] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}`)
            .then(res => res.json())
            .then(data => setNode(data))
    }, [uuid]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}/children`)
            .then(res => res.json())
            .then(data => {
                setTags(data.filter(child => child.relation_type === 'TAG'));
                setDetails(data.filter(child => child.relation_type === 'DETAIL'));
                setContributors(data.filter(child => child.relation_type === 'CONTRIBUTOR'));
                setComponents(data.filter(child => child.relation_type === 'COMPONENT'));
                setAttachments(data.filter(child => child.relation_type === 'ATTACHMENT'));
                setInstances(data.filter(child => child.relation_type === 'INSTANCE'));
                setNotes(data.filter(child => child.relation_type === 'NOTE'));
            })
    }, [uuid]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [uuid]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}/sessions`)
            .then(res => res.json())
            .then(data => setSessions(data))
    }, [uuid]);

    return (
        <div className="GenericPage">
            <TagSection tags={tags}></TagSection>
            <TopSection details={details} contributors={contributors} node={node}></TopSection>
            <ReviewSection reviews={reviews}></ReviewSection>
            <SessionSection sessions={sessions}></SessionSection>
        </div>
    );
}

export default GenericPage;
