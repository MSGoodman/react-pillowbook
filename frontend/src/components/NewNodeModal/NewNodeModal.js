import React, { useState, useEffect } from 'react';
import './NewNodeModal.scss';
import Modal from "react-modal";
import { createNodeOrIgnore, createRelation } from '../../utils/api';
import { stringToTitleCase } from '../../utils/utils'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
        width: '75%'
    }
};


function NewNodeModal(props) {
    const notify = () => toast("Wow so easy !");

    function createNewNode(newNodeName, newNodeType, newNodeText, parentName, relationName, relationType) {
        console.log(newNodeName, newNodeType, newNodeText, parentName, relationName, relationType)
        const requestBody = { name: newNodeName, type: newNodeType, markdown_content: newNodeText };
        // Make the new node if it doesn't exist
        createNodeOrIgnore(requestBody)
            .then(newNodeJson => {
                if (!parentName) {
                    props.close();
                    toast(<Link to={`/nodes/${newNodeJson.node_uuid}`} className="toastLink"> Created <b>{newNodeJson.name}</b> </Link>)
                }
                else {

                    // Make the relation
                    createRelation(parentName, newNodeName, relationName, relationType)
                        .then(newRelationRes => {
                            // Display the new tag
                            props.close();
                            toast(<Link to={`/nodes/${newNodeJson.node_uuid}`} className="toastLink"> Created <b>{newNodeJson.name}</b> </Link>)
                        })
                }
            });
    }


    useEffect(() => { setNewNodeType(props.type); }, [props.type]);
    useEffect(() => { setNewNodeName(props.name); }, [props.name]);
    useEffect(() => { setNewNodeText(props.text); }, [props.text]);
    useEffect(() => { setNewNodeParentName(props.parentName); }, [props.parentName]);
    useEffect(() => { setNewRelationType(props.relationType); }, [props.relationType]);
    useEffect(() => { setNewRelationName(props.relationName); }, [props.relationName]);

    // Modal.setAppElement('#App')
    const [newNodeName, setNewNodeName] = useState('');
    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeText, setNewNodeText] = useState();
    const [newNodeParentName, setNewNodeParentName] = useState('');
    const [newNodeRelationType, setNewRelationType] = useState('');
    const [newNodeRelationName, setNewRelationName] = useState('');

    const relationDisplay = newNodeRelationName && newNodeParentName ?
        <div className="relationDisplay">
            Creating as <span>{stringToTitleCase(newNodeRelationType)}</span> of <span>{newNodeParentName}</span>
        </div> : null;

    const relationNameInput = props.showRelationNameInput ?
        <label htmlFor="newRelationName">
            <input type="text" className="newRelationName" name="relationName" value={newNodeRelationName} placeholder="Enter Contributor Role" onChange={e => setNewRelationName(e.target.value)}></input>
        </label> : null;

    const options = props.nodeTypes.map((t, i) =>
        <option key={t.name} value={t.name}>
            {t.name}
        </option>)

    return (
        <Modal isOpen={props.isOpen} style={customStyles} overlayClassName="Overlay"
            contentLabel="Example Modal">
            <div className="NewNodeModal">
                <button className="closeModal" onClick={props.close}><i className="fas fa-times"></i></button>
                <h1>Creating Item</h1>
                {relationDisplay}

                <label htmlFor="newNodeName">
                    <input type="text" className="newNodeName" name="name" value={newNodeName} placeholder="Enter Name" onChange={e => setNewNodeName(e.target.value)}></input>
                </label>

                {relationNameInput}

                <label htmlFor="newNodeType">Type</label>
                <select name="newNodeType" value={newNodeType} onChange={e => setNewNodeType(e.target.value)}>
                    {options}
                </select>

                <label htmlFor="newNodeText">Text</label>
                <textarea name="newNodeText" value={newNodeText} onChange={e => setNewNodeText(e.target.value)}></textarea>


                <button className="createButton" onClick={() => createNewNode(newNodeName, newNodeType, newNodeText,
                    newNodeParentName, newNodeRelationName, newNodeRelationType)}> <i className="far fa-save"></i> Create</button>
            </div>
        </Modal>
    );
}

export default NewNodeModal;
