import React, { useState } from 'react';
import './NewTag.scss';
import { Link } from 'react-router-dom';
import { createNodeOrIgnore, createRelation } from '../../../../utils/api'

function NewTag(props) {

    function confirmTag(newTagName) {
        const requestBody = { name: newTagName, type: 'DATUM', markdown_content: '' };
        // Make the new node if it doesn't exist
        createNodeOrIgnore(requestBody)
            .then(newNodeJson => {
                // Make the relation
                createRelation(props.parent_node_name, newNodeJson.name, 'Tag', 'TAG')
                    .then(newRelationRes => {
                        // Display the new tag
                        props.addTag(newNodeJson);
                        setNewTagName("");
                        setTextboxVisible(false);
                    })
            });
    }

    const [textboxVisible, setTextboxVisible] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [newTag, setNewTag] = useState({});

    const addButton = !textboxVisible ?
        <button onClick={() => setTextboxVisible(true)} className="newTagButton">
            <i className="fas fa-plus"></i> Add New
    </button> : null;

    const cancelButton = textboxVisible ?
        <button onClick={() => setTextboxVisible(false)} className="cancelNewTagButton sideButton">
            <i className="fas fa-ban"></i>
        </button> : null;

    const confirmButton = textboxVisible && newTagName != "" ?
        <button onClick={() => confirmTag(newTagName)} className="confirmNewTagButton sideButton">
            <i className="fas fa-check"></i>
        </button> : null;

    const newInput = textboxVisible ? <input className="newTagInput" onChange={e => setNewTagName(e.target.value)}></input> : null;

    return (
        <span className="NewTag">
            {addButton}
            {cancelButton} {newInput} {confirmButton}
        </span>
    );
}

export default NewTag;
