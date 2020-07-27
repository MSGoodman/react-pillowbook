import React from 'react';
import './ContributorSection.css';
import Contributor from './Contributor/Contributor';

function ContributorSection(props) {
    const contributors = props.contributors.map((c, i) => <Contributor key={"contrib" + i}
        relation={c.relation}
        name={c.name}
        icon={c.icon}></Contributor>)

    return (
        <div className="ContributorSection">
            {contributors}
        </div>
    );
}

export default ContributorSection;
