import React, { useState, useEffect } from 'react';
import './NewNodeModal.css';

function NewNodeModal(props) {
    const uuid = props.match.params.uuid;
    // Expects only one prop, node_uuid, and will make the necessary api calls from here
    const [node, setNode] = useState({});
    const [tags, setTags] = useState([]);
    const [details, setDetails] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [components, setComponents] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [tagOf, setTagOf] = useState([]);
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

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}/tagParents`)
            .then(res => res.json())
            .then(data => setTagOf(data))
    }, [uuid]);

    if (node.node_uuid) {
        return (
            <div className="NewNodeModal">
                <TagSection tags={tags} updateTags={setTags} parent_node_name={node.name}></TagSection>
                <TopSection details={details} contributors={contributors} node={node}></TopSection>
                <ReviewSection reviews={reviews}></ReviewSection>
                <SessionSection sessions={sessions}></SessionSection>
                <TagOfSection tagOf={tagOf}></TagOfSection>
            </div>
        );
    }
    else {
        return <div>No node found, the API may not be running.</div>
    }
}

export default NewNodeModal;
