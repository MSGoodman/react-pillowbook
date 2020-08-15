import React from 'react';
import './VerticalImageSection.scss';


function VerticalImageSection(props) {
    const verticalImage = props.parentNode.vertical_image_uuid ?
        <div className="verticalImage"> <img src={require(`../../../../assets/uploads/${props.parentNode.vertical_image_uuid}.${props.parentNode.vertical_image_extension}`)} alt={props.parentNode.name + " image"} /> </div> :
        null;

    const horizontalImage = props.parentNode.horizontal_image_uuid ?
        <div className="horizontalImage"> <img src={require(`../../../../assets/uploads/${props.parentNode.horizontal_image_uuid}.${props.parentNode.horizontal_image_extension}`)} alt={props.parentNode.name + " image"} /> </div> :
        null;

    return (
        <div className="VerticalImageSection">
            {verticalImage}
            {horizontalImage}
        </div>
    );
}

export default VerticalImageSection;
