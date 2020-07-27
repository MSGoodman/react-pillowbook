import React from 'react';
import './TagSection.css';
import Tag from './Tag/Tag';

function TagSection(props) {
    const tags = props.tags.map((t, i) => <Tag key={t.node_uuid} name={t.name} node_uuid={t.node_uuid}></Tag>)

    return (
        <div className="TagSection">
            <i className="fas fa-tags"></i>
            {tags}
        </div>
    );
}

export default TagSection;
