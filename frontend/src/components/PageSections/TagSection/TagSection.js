import React from 'react';
import './TagSection.css';
import Tag from './Tag/Tag';

function TagSection(props) {
    const tags = props.tags.map((t, i) => <Tag key={"tag" + i} name={t.name}></Tag>)

    return (
        <div className="TagSection">
            <i className="fas fa-tags"></i>
            {tags}
        </div>
    );
}

export default TagSection;
