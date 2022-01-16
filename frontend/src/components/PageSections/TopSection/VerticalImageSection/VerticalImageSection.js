import React from "react";
import "./VerticalImageSection.scss";

function VerticalImageSection(props) {
    const verticalImage = props.parentNode.vertical_image_uuid ? (
        <div className="verticalImage"> ok </div>
    ) : null;

    const horizontalImage = props.parentNode.horizontal_image_uuid ? (
        <div className="horizontalImage"> ok2 </div>
    ) : null;

    return (
        <div className="VerticalImageSection">
            {verticalImage}
            {horizontalImage}
        </div>
    );
}

export default VerticalImageSection;
