import React from 'react';
import './DetailSection.css';
import Detail from './Detail/Detail';

function DetailSection(props) {
    const details = props.details.map((c, i) => <Detail key={"contrib" + i}
        relation={c.relation}
        name={c.name}
        icon={c.icon}></Detail>)

    return (
        <div className="DetailSection">
            {details}
        </div>
    );
}

export default DetailSection;
