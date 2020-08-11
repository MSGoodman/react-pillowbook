import React, { useState, useEffect } from 'react';
import './NewNodeModal.scss';
import Modal from "react-modal";
import { createNodeOrIgnore, createRelation, createReview, createFileRecord, uploadFile, createSession } from '../../utils/api';
import { stringToTitleCase } from '../../utils/utils'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { nodeTypes } from '../../utils/utils';
import Ratings from 'react-ratings-declarative';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

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
    function submitEnabled() {
        if (newNodeName == "") { return false }
        if (newNodeRelationName == "") { return false }
        if (newNodeType == 'SESSION' && !newNodeParentName) { return false }
        return true;
    }

    const fileSelect = event => { setSelectedFile(event.target.files[0]) }

    function resetModal() {
        setNewNodeName('');
        setNewNodeText('');
        setnewNodeRating(3);
    }


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
                    // Add any companion records (review, session, etc)
                    let companionRecordPromise = Promise.resolve();
                    if (newNodeType == 'REVIEW') { companionRecordPromise = createReview(newNodeJson.node_id, newNodeRating); }
                    if (newNodeType == 'SESSION') {
                        companionRecordPromise = createSession(newNodeJson.node_id, newNodeRating,
                            Math.floor(newNodeStartTime.getTime() / 1000), Math.floor(newNodeEndTime.getTime() / 1000));
                    }
                    if (newNodeType == 'FILE') {
                        console.log(selectedFile);
                        const extension = selectedFile.name.split('.')[selectedFile.name.split('.').length - 1];
                        const newFilename = newNodeJson.node_uuid + '.' + extension;
                        companionRecordPromise = createFileRecord(newNodeJson.node_id, extension).then(i => { uploadFile(selectedFile, newFilename); })
                    }

                    // Make the relation
                    companionRecordPromise.then(newCompanionRes => {
                        createRelation(parentName, newNodeName, relationName, relationType)
                            .then(newRelationRes => {
                                // Display the new tag
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

    // Modal.setAppElement('#App')
    const [useExisting, setUseExisting] = useState(props.useExisting);
    const [newNodeName, setNewNodeName] = useState('');
    const [newNodeType, setNewNodeType] = useState(props.type);
    const [newNodeText, setNewNodeText] = useState();
    const [newNodeParentName, setNewNodeParentName] = useState('');
    const [newNodeRelationType, setNewRelationType] = useState('');
    const [newNodeRelationName, setNewRelationName] = useState('');
    const [newNodeRating, setnewNodeRating] = useState(3);
    const [newNodeStartTime, setNewNodeStartTime] = useState(new Date());
    const [newNodeEndTime, setNewNodeEndTime] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState({});
    const [nodesOfSelectedType, setNodesOfSelectedType] = useState([]);
    const [disallowExisting, setDisallowExisting] = useState(false);
    const [allNodes, setAllNodes] = useState([]);

    useEffect(() => {
        if (newNodeType == 'SESSION') {
            setNewNodeName(
                `SESSION OF: ${newNodeParentName} [${moment(newNodeStartTime).format("MM-DD-YY h:mm A")} - ${moment(newNodeEndTime).format("MM-dd-YY h:mm A")}]`
            );
        }
    }, [newNodeStartTime, newNodeEndTime, newNodeParentName])

    useEffect(() => {
        if (['REVIEW', 'SESSION'].includes(newNodeType)) setDisallowExisting(true)
        else setDisallowExisting(false)
    }, [newNodeType])

    useEffect(() => {
        fetch(`http://localhost:9000/nodes?type=${newNodeType}`)
            .then(res => res.json())
            .then(data => { setNodesOfSelectedType(data); console.log(nodesOfSelectedType) })
    }, [newNodeType]);

    useEffect(() => {
        fetch(`http://localhost:9000/nodes`)
            .then(res => res.json())
            .then(data => { setAllNodes(data); })
    }, []);

    const relationDisplay = !props.hideCreatingAs ?
        <div className="relationDisplay">
            {useExisting ? "Linking" : "Creating"} as <span>{stringToTitleCase(newNodeRelationType)}</span> of <span>{newNodeParentName}</span>
        </div> : null;

    const nodeTypeOptions = nodeTypes.map((t, i) =>
        <option key={t.name} value={t.name}>
            {t.name}
        </option>)

    const nodeTypeInput = !props.hideNodeType ?
        <div className="nodeTypeSection">
            <label htmlFor="newNodeType">Type</label>
            <select name="newNodeType" value={newNodeType} onChange={e => setNewNodeType(e.target.value)}>
                {nodeTypeOptions}
            </select>
        </div> : null;


    const addButton = useExisting ?
        <button onClick={() => { setUseExisting(false); setNewNodeName(""); }} className="newTagButton smallButton">
            <i className="fas fa-plus"></i> Add New Node
    </button> : null;

    const useExistingButton = !useExisting && !disallowExisting ?
        <button onClick={() => setUseExisting(true)} className="newTagButton smallButton">
            <i className="fas fa-link"></i> Use Existing Node
    </button> : null;

    const existingNodeOptions = nodesOfSelectedType.length > 0 ? nodesOfSelectedType.map((t, i) =>
        <option key={t.node_uuid} value={t.name}>
            {t.name}
        </option>) : [<option value="">No Nodes Found of Type {newNodeType}</option>];

    const existingNodeSection = useExisting ?
        <div className="existingNodeSection">
            <label htmlFor="existingNode">Select Node To Link</label>
            <select name="existingNode" value={newNodeName} onChange={e => setNewNodeName(e.target.value)} disabled={nodesOfSelectedType.length == 0}>
                {existingNodeOptions}
            </select>
            {addButton}
        </div> : null;

    const nonSessionNodeOptions = allNodes.length > 0 ? allNodes.filter(n => n.type != 'SESSION').map((t, i) =>
        <option key={t.node_uuid} value={t.name}>
            {t.name}
        </option>) : [<option value="">No Nodes Found</option>];

    const nonSessionNodesSection = newNodeType == 'SESSION' && !props.parentName ?
        <div className="allNodeSection">
            <label htmlFor="allNode">Session Of</label>
            <select name="allNode" value={newNodeParentName} onChange={e => setNewNodeParentName(e.target.value)} disabled={allNodes.length == 0}>
                <option disabled selected value> -- SELECT A PARENT -- </option>
                {nonSessionNodeOptions}
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

    const nodeNameInput = !useExisting && newNodeType != 'SESSION' ?
        <label htmlFor="newNodeName">
            <input type="text" className="newNodeName" name="name" value={newNodeName} placeholder="Enter Name" onChange={e => setNewNodeName(e.target.value)}></input>
        </label> : null;

    const relationNameInput = props.relationNameInputPlaceholder ?
        <div className="relationNameSection">
            <label htmlFor="newRelationName">
                <input type="text" className="newRelationName" name="relationName" value={newNodeRelationName} placeholder={props.relationNameInputPlaceholder} onChange={e => setNewRelationName(e.target.value)}></input>
            </label>
        </div> : null;

    const uploadSection = newNodeType == 'FILE' ?
        <div class="form-group files">
            <input type="file" onChange={fileSelect} />
        </div> : null;

    const newNodeTextInput = !useExisting ?
        <div className="newNodeTextSection">
            <label htmlFor="newNodeText">Text</label>
            <textarea name="newNodeText" value={newNodeText} onChange={e => setNewNodeText(e.target.value)}></textarea>
        </div> : null;

    const timeInput = newNodeType == 'SESSION' ?
        <div className="sessionTimeSection">
            <DateTimePicker
                onChange={setNewNodeStartTime}
                value={newNodeStartTime}
                clearIcon={null} />
             -
            <DateTimePicker
                onChange={setNewNodeEndTime}
                value={newNodeEndTime}
                clearIcon={null} />
        </div> : null;

    return (
        <Modal isOpen={props.isOpen} style={customStyles} overlayClassName="Overlay"
            contentLabel="Example Modal">
            <div className="NewNodeModal">
                <button className="closeModal" onClick={props.close}><i className="fas fa-times"></i></button>
                <h1>{useExisting ? "Linking" : "Creating"} {stringToTitleCase(newNodeType)}</h1>
                {relationDisplay}

                {nodeTypeInput}

                {relationNameInput}

                {nonSessionNodesSection}

                {nodeNameInput}

                {timeInput}

                {existingNodeSection}

                {uploadSection}

                {ratingInput}

                {newNodeTextInput}

                {useExistingButton}

                <button className="createButton" disabled={!submitEnabled()} onClick={() => createNewNode(newNodeName, newNodeType, newNodeText,
                    newNodeParentName, newNodeRelationName, newNodeRelationType)}> <i className="far fa-save"></i> Create</button>
            </div>
        </Modal>
    );
}

export default NewNodeModal;
