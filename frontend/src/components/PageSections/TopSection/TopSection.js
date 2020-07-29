import React from 'react';
import './TopSection.scss';
import ContributorSection from './ContributorSection/ContributorSection';
import DetailSection from './DetailSection/DetailSection';

function TopSection(props) {
    const icon = props.node.icon ? <i className={props.node.icon}></i> : null;
    const verticalImage = props.node.vertical_image ?
        <div className="image"> <img src={`${process.env.PUBLIC_URL}/uploads/${props.node.vertical_image}.jpg`} alt={props.node.vertical_image + " image"} /> </div> :
        null;

    return (
        <div className="TopSection">
            {verticalImage}
            <div className="text">
                <h1 className="title">{icon} {props.node.name}</h1>
                <DetailSection details={props.details}></DetailSection>
                <ContributorSection contributors={props.contributors}></ContributorSection>
                <div className="nodeText">
                    {props.node.markdown_content}
                </div>
            </div>
        </div>
    );
}

export default TopSection;
