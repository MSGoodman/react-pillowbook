import React from 'react';
import './InfoSection.scss';
import ArtRelationship from './ArtRelationship/ArtRelationship';

function InfoSection(props) {
    const details = props.details.map(r =>
        <ArtRelationship relationName={r.relationName}
            itemName={r.itemName}
            icon={r.icon}></ArtRelationship>);

    const contributors = props.contributors.map(r =>
        <ArtRelationship relationName={r.relationName}
            itemName={r.itemName}
            icon={r.icon}></ArtRelationship>);
    return (
        <div className="InfoSection">
            <div className="boxart">
                <img src={`${process.env.PUBLIC_URL}/images/${props.imagefilename}`} alt={props.name + " box art"} />
            </div>
            <div className="details">
                <h1 className="artTitle">{props.name}</h1>
                {details}
                {contributors}
            </div>
        </div>
    );
}

export default InfoSection;
