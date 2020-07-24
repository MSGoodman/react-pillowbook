import React from 'react';
import './TagSection.css';
import Tag from '../../../Tag/Tag';

function TagSection(props) {
    const tags = props.tags.map(t => <Tag name={t.itemName}></Tag>)

    return (
        <div className="TagSection">
            {tags}
        </div>
    );
}

export default TagSection;
