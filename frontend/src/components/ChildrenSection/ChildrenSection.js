import React, { useState, useEffect } from 'react';
import './ChildrenSection.css';
import Review from '../childElements/Review/Review';
import Session from '../childElements/Session/Session';
import SubsectionNewButton from '../SubsectionNewButton/SubsectionNewButton';
import NewNodeModal from '../NewNodeModal/NewNodeModal';
import { stringToTitleCase } from '../../utils/utils';

function ChildrenSection(props) {
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);
    const children = props.children.filter(child => child.relation_type === props.sectionType)
    const childrenElements = children.map((c) => {
        const key = props.sectionType + "_" + c.node_uuid;
        if (props.sectionType == 'REVIEW') return <Review key={key} node={c}></Review>
        if (props.sectionType == 'SESSION') return <Session key={key} node={c}></Session>
    });

    return (
        <div className="ChildrenSection">
            <h1>{stringToTitleCase(props.sectionType) + "s"}</h1>
            {childrenElements}
            <div className="buttonSection">
                <SubsectionNewButton clickFunction={() => setIsNewNodeModalOpen(true)} relationName={stringToTitleCase(props.sectionType)}></SubsectionNewButton>
            </div>

            <NewNodeModal
                isOpen={isNewNodeModalOpen}
                close={() => setIsNewNodeModalOpen(false)}
                name=""
                type={props.sectionType}
                parentNodeUUID={props.parentNode.node_uuid}
                parentName={props.parentNode.name}
                relationName={stringToTitleCase(props.sectionType)}
                relationType={props.sectionType}
                hideNodeType={true}>
            </NewNodeModal>

        </div>
    );
}

export default ChildrenSection;
