import React from 'react';
import './Attachment.scss';
import moment from 'moment';
import Stars from '../../Stars/Stars';
import { Link } from 'react-router-dom';

function Attachment(props) {
    const imageExtensions = ['jpg', 'png', 'svg', 'jpeg', 'gif'];
    const src = require(`../../../assets/uploads/${props.node.node_uuid + '.' + props.node.file_extension}`);
    const image = imageExtensions.includes(props.node.file_extension.toLowerCase()) ?
        <img src={src} alt={props.node.name + " image"} />
        : <img className="nonImageImage" src={require('../../../assets/images/file-archive.svg')} alt="generic attachment image" />

    return (
        <div className="Attachment">
            <div className="filename">{props.node.name}</div>
            <a href={src} download><i className="fas fa-download"></i></a>
            <Link to={`/nodes/${props.node.node_uuid}`}> <i className="fas fa-external-link-alt"></i> </Link>

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
