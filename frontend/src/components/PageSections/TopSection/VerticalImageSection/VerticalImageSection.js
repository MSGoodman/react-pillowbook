import React, { useState, useEffect } from 'react';
import './VerticalImageSection.scss';
import { createNodeOrIgnore, createRelation, createFile } from '../../../../utils/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function VerticalImageSection(props) {
    const verticalImage = props.verticalImage ?
        <div className="image"> <img src={`${process.env.PUBLIC_URL}/uploads/${props.verticalImage}.jpg`} alt={props.verticalImage + " image"} /> </div> :
        null;

    return (
        <div className="VerticalImageSection">
            {verticalImage}
        </div>
    );
}

export default VerticalImageSection;
