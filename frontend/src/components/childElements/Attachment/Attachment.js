import React from 'react';
import './Attachment.scss';
import moment from 'moment';
import Stars from '../../Stars/Stars';
import { Link } from 'react-router-dom';
import { updateNode } from '../../../utils/api';

function Attachment(props) {
    function updateHorizontal() {
        const updatedNode = { ...props.parentNode };
        updatedNode.horizontal_image_node = props.node.node_id;
        updateNode(updatedNode).then(updated => props.setNewestNodeUpdate('Set new horizontal image: ' + props.node.name));
    }
    function updateVertical() {
        console.log(props.node)
        const updatedNode = { ...props.parentNode };
        updatedNode.vertical_image_node = props.node.node_id;
        updateNode(updatedNode).then(updated => props.setNewestNodeUpdate('Set new vertical image: ' + props.node.name));
    }

    const imageExtensions = ['jpg', 'png', 'svg', 'jpeg', 'gif', 'jfif'];
    const src = require(`../../../assets/uploads/${props.node.node_uuid + '.' + props.node.file_extension}`);
    const image = imageExtensions.includes(props.node.file_extension.toLowerCase()) ?
        <img src={src} alt={props.node.name + " image"} />
        : <img className="nonImageImage" src={require('../../../assets/images/file-archive.svg')} alt="generic attachment image" />

    return (
        <div className="Attachment">
            <div className="filename">{props.node.name}</div>
            <a title="Download file" href={src} download><i className="fas fa-download"></i></a>
            <a title="Set as horizontal image" onClick={updateHorizontal}><i className="fas fa-arrows-alt-h"></i></a>
            <a title="Set as vertical image" onClick={updateVertical}><i className="fas fa-arrows-alt-v"></i></a>
            <Link to={`/nodes/${props.node.node_uuid}`} title="Navigate to file page"> <i className="fas fa-external-link-alt"></i> </Link>

            {image}
            {/* <Link to={`/nodes/${props.node.node_uuid}`} className="reviewHeader">
                <Stars rating={props.node.review_rating}></Stars>
                <span className="date">{moment.unix(props.node.created_at).format("YYYY-MM-DD")}</span>
                <span className="title">{props.node.name}</span>
            </Link>
            <div className="reviewText">
                {props.node.markdown_content}
            </div> */}
        </div >
    );
}

export default Attachment;
