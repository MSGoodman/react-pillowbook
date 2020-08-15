import React, { useState, useEffect } from 'react';
import './NewRelationModal.scss';
import Modal from "react-modal";
import { createNodeOrIgnore, createRelation, createReview } from '../../utils/api';
import { stringToTitleCase } from '../../utils/utils'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { nodeTypes } from '../../utils/utils';
import Ratings from 'react-ratings-declarative';

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


function NewRelationModal(props) {
    function resetModal() {
        setNewNodeName('');
        setNewNodeText('');
        setnewNodeRating(3);
    }

    function createNewNode(newNodeName, newNodeType, newNodeText, parentName, relationName, relationType) {
        const requestBody = { name: newNodeName, type: newNodeType, markdown_content: newNodeText };

        // Make the new node if required and it doesn't exist
        let nodeCreationPromise = Promise.resolve();
        if (false) { nodeCreationPromise = createNodeOrIgnore(requestBody); }
        createNodeOrIgnore(requestBody)
            .then(newNodeJson => {

                // If there is no parent node specified (so we don't need to make a relation) then just exit
                if (!parentName) {
                    props.close();
                    toast(<Link to={`/nodes/${newNodeJson.node_uuid}`} className="toastLink"> Created <b>{newNodeJson.name}</b> </Link>)
                }

                // If there IS a parent node specified, make any companion records and then the relation
                else {

                    // Add any companion records (review, session, etc)
                    let companionRecordPromise = Promise.resolve();
                    if (newNodeType == 'REVIEW') { companionRecordPromise = createReview(newNodeJson.node_id, newNodeRating); }
                    companionRecordPromise.then(newCompanionRes => {

                        // Make the relation
                        createRelation(parentName, newNodeName, relationName, relationType)
                            .then(newRelationRes => {
                                props.setNewestAddedNode(newNodeJson.node_uuid);
                                resetModal();
                                props.close();
                                toast(<Link to={`/nodes/${newNodeJson.node_uuid}`} className="toastLink"> Created <b>{newNodeJson.name}</b> </Link>)
                            })
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

    const [newNodeName, setNewNodeName] = useState('');
    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeText, setNewNodeText] = useState();
    const [newNodeParentName, setNewNodeParentName] = useState('');
    const [newNodeRelationType, setNewRelationType] = useState('');
    const [newNodeRelationName, setNewRelationName] = useState('');
    const [newNodeRating, setnewNodeRating] = useState(3);

    const relationDisplay = !props.hideCreatingAs ?
        <div className="relationDisplay">
            Creating as <span>{stringToTitleCase(newNodeRelationType)}</span> of <span>{newNodeParentName}</span>
        </div> : null;

    const options = nodeTypes.map((t, i) =>
        <option key={t.name} value={t.name}>
            {t.name}
        </option>)

    const nodeTypeInput = !props.hideNodeType ?
        <div className="nodeTypeSection">
            <label htmlFor="newNodeType">Type</label>
            <select name="newNodeType" value={newNodeType} onChange={e => setNewNodeType(e.target.value)}>
                {options}
            </select>
        </div> : null;

    const ratingInput = newNodeType == 'REVIEW' ?
        <Ratings
            rating={newNodeRating}
            widgetRatedColors="black"
            widgetHoverColors="black"
            widgetDimensions='35px'
            widgetSpacings='1px'
            changeRating={setnewNodeRating}>

            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
        </Ratings> : null;

    const relationNameInput = props.relationNameInputPlaceholder ?
        <div className="relationNameSection">
            <label htmlFor="newRelationName">
                <input type="text" className="newRelationName" name="relationName" value={newNodeRelationName} placeholder={props.relationNameInputPlaceholder} onChange={e => setNewRelationName(e.target.value)}></input>
            </label>
        </div> : null;


    return (
        <Modal isOpen={props.isOpen} style={customStyles} overlayClassName="Overlay"
            contentLabel="Example Modal">
            <div className="NewRelationModal">
                <button className="closeModal" onClick={props.close}><i className="fas fa-times"></i></button>
                <h1>Creating {stringToTitleCase(newNodeRelationType)}</h1>
                {relationDisplay}

                {relationNameInput}

                <label htmlFor="newNodeName">
                    <input type="text" className="newNodeName" name="name" value={newNodeName} placeholder="Enter Name" onChange={e => setNewNodeName(e.target.value)}></input>
                </label>


                {nodeTypeInput}

                {ratingInput}

                <label htmlFor="newNodeText">Text</label>
                <textarea name="newNodeText" value={newNodeText} onChange={e => setNewNodeText(e.target.value)}></textarea>


                <button className="createButton" onClick={() => createNewNode(newNodeName, newNodeType, newNodeText,
                    newNodeParentName, newNodeRelationName, newNodeRelationType)}> <i className="far fa-save"></i> Create</button>
            </div>
        </Modal>
    );
}

export default NewRelationModal;
