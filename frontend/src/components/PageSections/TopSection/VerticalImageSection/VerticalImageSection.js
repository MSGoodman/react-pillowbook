import React, { useState, useEffect } from 'react';
import './VerticalImageSection.scss';
import { createNodeOrIgnore, createRelation, createFile } from '../../../../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function VerticalImageSection(props) {
    const verticalImage = props.parentNode.vertical_image ?
        <div className="image"> <img src={require(`../../../../assets/uploads/${props.parentNode.vertical_image}.${props.parentNode.vertical_extension}`)} alt={props.parentNode.name + " image"} /> </div> :
        null;

    return (
        <div className="VerticalImageSection">
            {verticalImage}
        </div>
    );
}

export default VerticalImageSection;
