import React, { useState, useEffect } from 'react';
import './DetailSection.scss';
import Detail from './Detail/Detail';
import SubsectionNewButton from '../../../SubsectionNewButton/SubsectionNewButton';
import NewNodeModal from '../../../NewNodeModal/NewNodeModal';

function DetailSection(props) {
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);
    const details = props.details.map((c, i) => <Detail key={c.node_uuid}
        relation={c.relation}
        name={c.name}
        icon={c.icon}
        node_uuid={c.node_uuid}></Detail>)

    return (
        <div className="DetailSection">
            {details}
            <SubsectionNewButton clickFunction={() => setIsNewNodeModalOpen(true)} relationName={"Detail"}></SubsectionNewButton>
            <NewNodeModal setNewestAddedNode={props.setNewestAddedNode} isOpen={isNewNodeModalOpen} close={() => setIsNewNodeModalOpen(false)}
                name="" type='DATUM' parentNodeUUID={props.parentNode.node_uuid} parentName={props.parentNode.name}
                relationName={''} relationType='DETAIL' hideNodeType={false} relationNameInputPlaceholder={"Enter Type of Detail (e.g. genre, release date)"}></NewNodeModal>
        </div>
    );
}

export default DetailSection;
