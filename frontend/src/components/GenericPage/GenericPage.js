import React, { useState, useEffect } from 'react';
import './GenericPage.css';
import TagSection from '../PageSections/TagSection/TagSection';
import TopSection from '../PageSections/TopSection/TopSection';
import ReviewSection from '../PageSections/ReviewSection/ReviewSection';
import SessionSection from '../PageSections/SessionSection/SessionSection';
import TagOfSection from '../PageSections/TagOfSection/TagOfSection';
import NewNodeModal from '../NewNodeModal/NewNodeModal';
import ChildrenSection from '../ChildrenSection/ChildrenSection';

function GenericPage(props) {
    const uuid = props.match.params.uuid;

    // Expects only one prop, node_uuid, and will make the necessary api calls from here
    const [node, setNode] = useState({});
    const [children, setChildren] = useState([]);
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
    const [newestAddedNode, setNewestAddedNode] = useState('');
    const [newestNodeUpdate, setNewestNodeUpdate] = useState('');

    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeRelationType, setNewNodeRelationType] = useState('');
    const [newNodeRelationName, setNewNodeRelationName] = useState('Z');

    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}`)
            .then(res => res.json())
            .then(data => { setNode(data); props.setTab(data) })
    }, [uuid, newestNodeUpdate]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes/${uuid}/children`)
            .then(res => res.json())
            .then(data => {
                setChildren(data);
                setTags(data.filter(child => child.relation_type === 'TAG'));
                setDetails(data.filter(child => child.relation_type === 'DETAIL'));
                setContributors(data.filter(child => child.relation_type === 'CONTRIBUTOR'));
                setComponents(data.filter(child => child.relation_type === 'COMPONENT'));
                setAttachments(data.filter(child => child.relation_type === 'ATTACHMENT'));
                setInstances(data.filter(child => child.relation_type === 'INSTANCE'));
                setNotes(data.filter(child => child.relation_type === 'NOTE'));
            })
    }, [uuid, newestAddedNode]);

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
            <div className="GenericPage">
                <TagSection tags={tags} updateTags={setTags} parent_node_name={node.name}></TagSection>
                <TopSection setNewestNodeUpdate={setNewestNodeUpdate} setNewestAddedNode={setNewestAddedNode} details={details} contributors={contributors} node={node}></TopSection>
                <ChildrenSection setNewestAddedNode={setNewestAddedNode} children={children} sectionType={'REVIEW'} parentNode={node}></ChildrenSection>
                <ChildrenSection setNewestAddedNode={setNewestAddedNode} children={children} sectionType={'SESSION'} parentNode={node}></ChildrenSection>
                <ChildrenSection setNewestNodeUpdate={setNewestNodeUpdate} setNewestAddedNode={setNewestAddedNode} children={children} sectionType={'ATTACHMENT'} parentNode={node}></ChildrenSection>
                <TagOfSection tagOf={tagOf}></TagOfSection>

                <NewNodeModal isOpen={isNewNodeModalOpen} close={() => setIsNewNodeModalOpen(false)}
                    name="" type={newNodeType} parentNodeUUID={uuid} parentName={node.name} relationName={newNodeRelationName} relationType={newNodeRelationType}></NewNodeModal>
            </div>
        );
    }
    else {
        return <div>No node found, the API may not be running.</div>
    }
}

export default GenericPage;
