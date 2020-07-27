import React from 'react';
import './DetailSection.css';
import Detail from './Detail/Detail';

function DetailSection(props) {
    const details = props.details.map((c, i) => <Detail key={c.node_uuid}
        relation={c.relation}
        name={c.name}
        icon={c.icon}
        node_uuid={c.node_uuid}></Detail>)

    return (
        <div className="DetailSection">
            {details}
        </div>
    );
}

export default DetailSection;
