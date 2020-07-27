import React from 'react';
import './TopSection.scss';
import ArtRelationship from './ContributorSection/Contributor/Contributor';
import ContributorSection from './ContributorSection/ContributorSection';
import DetailSection from './DetailSection/DetailSection';
import { tryRequire } from '../../../utils/utils'

function TopSection(props) {
    console.log(props.icon)
    const icon = props.icon ? <i className={props.icon}></i> : null;

    return (
        <div className="TopSection">
            <div className="image">
                <img src={`${process.env.PUBLIC_URL}/images/${props.imagefilename}`} alt={props.name + " image"} />
            </div>
            <div className="text">
                <h1 className="title">{icon} {props.name}</h1>
                <DetailSection details={props.details}></DetailSection>
                <ContributorSection contributors={props.contributors}></ContributorSection>
            </div>
        </div>
    );
}

export default TopSection;
