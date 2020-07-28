import React, { useState } from 'react';
import './NewTag.scss';
import { Link } from 'react-router-dom';
import { createNodeOrIgnore, createRelation } from '../../../../utils/api'

function NewTag(props) {

    function confirmTag(newTag) {
        const requestBody = { name: newTag, type: 'TAG', markdown_content: '' };
        console.log(JSON.stringify(requestBody));
        console.log(props)
        // Make the new node if it doesn't exist
        createNodeOrIgnore(requestBody)
            .then(ignore => createRelation(props.parent_node_name, newTag, 'Tag', 'TAG'))
            .then(data => {
                console.log(data);
                setNewTag("");
                setTextboxVisible(false);
            })
    }

    const [textboxVisible, setTextboxVisible] = useState(false);
    const [newTag, setNewTag] = useState("");

    const addButton = !textboxVisible ?
        <button onClick={() => setTextboxVisible(true)} className="newTagButton">
            <i className="fas fa-plus"></i> Add New
    </button> : null;

    const cancelButton = textboxVisible ?
        <button onClick={() => setTextboxVisible(false)} className="cancelNewTagButton sideButton">
            <i className="fas fa-ban"></i>
        </button> : null;

    const confirmButton = textboxVisible && newTag != "" ?
        <button onClick={() => confirmTag(newTag)} className="confirmNewTagButton sideButton">
            <i className="fas fa-check"></i>
        </button> : null;

    const newInput = textboxVisible ? <input className="newTagInput" onChange={e => setNewTag(e.target.value)}></input> : null;

    return (
        <span className="NewTag">
            {addButton}
            {cancelButton} {newInput} {confirmButton}
        </span>
    );
}

export default NewTag;
