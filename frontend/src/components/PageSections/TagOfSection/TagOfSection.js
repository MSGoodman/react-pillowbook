import React from 'react';
import './TagOfSection.css';
import TagOf from './TagOf/TagOf';
import SubsectionNewButton from '../../SubsectionNewButton/SubsectionNewButton';

function TagOfSection(props) {
    const tagsOf = props.tagOf.map((t, i) => <TagOf key={"tagOf" + t.parent_node_uuid}
        parent_name={t.parent_name} parent_node_uuid={t.parent_node_uuid} ></TagOf>)
    return (
        <div className="TagOfSection">
            <h1>Tag Of</h1>
            <ul>
                {tagsOf}
            </ul>
            <SubsectionNewButton></SubsectionNewButton>
        </div>
    );
}

export default TagOfSection;
