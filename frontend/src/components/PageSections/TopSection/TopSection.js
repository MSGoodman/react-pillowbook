import React, { useState } from 'react';
import './TopSection.scss';
import ContributorSection from './ContributorSection/ContributorSection';
import DetailSection from './DetailSection/DetailSection';
import VerticalImageSection from './VerticalImageSection/VerticalImageSection';
import TextareaAutosize from 'react-textarea-autosize';
import { updateNode } from '../../../utils/api';
import ReactMarkdown from "react-markdown";

function TopSection(props) {
    function updateDescription() {
        const updatedNode = { ...props.node };
        updatedNode.markdown_content = newDescription;
        updateNode(updatedNode).then(updated => props.setNewestNodeUpdate('Updated markdown content'));
        setTextboxVisible(false);
    }

    const [textboxVisible, setTextboxVisible] = useState(false);
    const [newDescription, setNewDescription] = useState(props.node.markdown_content);

    const icon = props.node.icon ? <i className={props.node.icon}></i> : null;
    const displayDescription = !textboxVisible ? <ReactMarkdown source={props.node.markdown_content} /> : null;
    const editDescription = textboxVisible ? <TextareaAutosize value={newDescription} onChange={e => setNewDescription(e.target.value)} /> : null;

    const editButton = !textboxVisible ?
        <button onClick={() => setTextboxVisible(true)} className="newTagButton"> <i className="fas fa-pencil-alt"></i> Edit Description </button> : null;

    const cancelButton = textboxVisible ?
        <button onClick={() => { setTextboxVisible(false); setNewDescription(props.node.markdown_content); }} className="cancelNewTagButton smallButton" >
            <i className="fas fa-ban"></i> Cancel Changes </button > : null;

    const confirmButton = textboxVisible ?
        <button onClick={updateDescription} className="confirmNewTagButton smallButton"><i className="fas fa-check"></i> Save Changes</button> : null;

    return (
        <div className="TopSection">
            <VerticalImageSection parentNode={props.node}></VerticalImageSection>
            <div className="text">
                <h1 className="title">{icon} {props.node.name}</h1>
                <DetailSection setNewestAddedNode={props.setNewestAddedNode} details={props.details} parentNode={props.node}></DetailSection>
                <ContributorSection setNewestAddedNode={props.setNewestAddedNode} contributors={props.contributors} parentNode={props.node}></ContributorSection>
                <div className="nodeText">
                    <div className="description">
                        {displayDescription}
                        {editDescription}
                    </div>
                    <div className="descriptionButtons">
                        {editButton} {cancelButton} {confirmButton}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopSection;
