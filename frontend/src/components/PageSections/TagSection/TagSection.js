import React from 'react';
import './TagSection.css';
import Tag from './Tag/Tag';
import NewTag from './NewTag/NewTag';

function TagSection(props) {
    function addTag(newTag) {
        const tags = props.tags.slice();
        tags.push(newTag);
        props.updateTags(tags);
    }
    const tags = props.tags.map((t, i) => <Tag key={t.node_uuid} name={t.name} node_uuid={t.node_uuid}></Tag>)

    return (
        <div className="TagSection">
            <i className="fas fa-tags"></i>
            {tags}
            <NewTag parent_node_name={props.parent_node_name} addTag={addTag}></NewTag>
        </div>
    );
}

export default TagSection;
