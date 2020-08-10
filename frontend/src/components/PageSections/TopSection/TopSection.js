import React from 'react';
import './TopSection.scss';
import ContributorSection from './ContributorSection/ContributorSection';
import DetailSection from './DetailSection/DetailSection';
import VerticalImageSection from './VerticalImageSection/VerticalImageSection';

function TopSection(props) {
    const icon = props.node.icon ? <i className={props.node.icon}></i> : null;

    return (
        <div className="TopSection">
            <VerticalImageSection parentNode={props.node}></VerticalImageSection>
            <div className="text">
                <h1 className="title">{icon} {props.node.name}</h1>
                <DetailSection setNewestAddedNode={props.setNewestAddedNode} details={props.details} parentNode={props.node}></DetailSection>
                <ContributorSection setNewestAddedNode={props.setNewestAddedNode} contributors={props.contributors} parentNode={props.node}></ContributorSection>
                <div className="nodeText">
                    {props.node.markdown_content}
                </div>
            </div>
        </div>
    );
}

export default TopSection;
