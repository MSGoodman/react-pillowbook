import React, { useState, useEffect } from 'react';
import './GenericPage.css';
import TagSection from '../PageSections/TagSection/TagSection';
import TopSection from '../PageSections/TopSection/TopSection';
import ReviewSection from '../PageSections/ReviewSection/ReviewSection';
import SessionSection from '../PageSections/SessionSection/SessionSection';

function GenericPage(props) {
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
        fetch(`http://localhost:9000/nodes/${props.node_uuid}`)
            .then(res => res.json())
            .then(data => setNode(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${props.node_uuid}/children`)
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
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${props.node_uuid}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${props.node_uuid}/sessions`)
            .then(res => res.json())
            .then(data => setSessions(data))
    }, []);

    return (
        <div className="GenericPage">
            <TagSection tags={tags}></TagSection>
            <TopSection icon={node.icon} details={details} contributors={contributors} name={node.name} imagefilename='horizonzerodawn.jpg'></TopSection>
            <ReviewSection reviews={reviews}></ReviewSection>
            <SessionSection sessions={sessions}></SessionSection>
        </div>
    );
}

export default GenericPage;
