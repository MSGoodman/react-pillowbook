import React, { useState, useEffect } from 'react';
import './VerticalImageSection.scss';
import { createNodeOrIgnore, createRelation, createFile } from '../../../../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function VerticalImageSection(props) {
    const [selectedFile, setSelectedFile] = useState({});
    const fileSelect = event => { setSelectedFile(event.target.files[0]) }
    async function fileUpload() {
        const filenameSplit = selectedFile.name.split('.');
        const requestBody = { name: selectedFile.name, type: 'FILE', markdown_content: '' };
        console.log(filenameSplit)

        // Make the new node
        createNodeOrIgnore(requestBody)
            .then(newNodeJson => {
                // Make the relation
                createRelation(props.parentNode.name, selectedFile.name, 'Attachment', 'ATTACHMENT')
                    .then(newRelationRes => {
                        // Make the file record
                        createFile(newNodeJson.node_id, filenameSplit[filenameSplit.length - 1])
                            .then(newFileRes => {
                                // Actually save the file
                                const data = new FormData()
                                data.append('file', selectedFile)
                                fetch("http://localhost:9000/upload",
                                    {
                                        body: data,
                                        method: "POST"
                                    });
                                setSelectedFile('');
                                toast(<Link to={`/nodes/${newNodeJson.node_uuid}`} className="toastLink"> Created <b>{newNodeJson.name}</b> </Link>)
                            })
                    })
            });



    }

    const verticalImage = props.verticalImage ?
        <div className="image"> <img src={`${process.env.PUBLIC_URL}/uploads/${props.verticalImage}.jpg`} alt={props.verticalImage + " image"} /> </div> :
        null;

    return (
        <div className="VerticalImageSection">
            <div class="form-group files">
                <input type="file" onChange={fileSelect} />
                <button type="button" onClick={fileUpload}>Upload</button>
            </div>
            {verticalImage}
        </div>
    );
}

export default VerticalImageSection;
