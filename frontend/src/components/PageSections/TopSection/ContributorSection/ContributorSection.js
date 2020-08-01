import React, { useState, useEffect } from 'react';
import './ContributorSection.scss';
import Contributor from './Contributor/Contributor';
import SubsectionNewButton from '../../../SubsectionNewButton/SubsectionNewButton';
import NewNodeModal from '../../../NewNodeModal/NewNodeModal';

function ContributorSection(props) {
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);

    const contributors = props.contributors.map((c, i) => <Contributor key={"contrib" + i}
        relation={c.relation}
        name={c.name}
        icon={c.icon}
        node_uuid={c.node_uuid}></Contributor>)

    return (
        <div className="ContributorSection">
            {contributors}
            <SubsectionNewButton clickFunction={() => setIsNewNodeModalOpen(true)} relationName="Contributor"></SubsectionNewButton>
            <NewNodeModal isOpen={isNewNodeModalOpen} close={() => setIsNewNodeModalOpen(false)}
                name="" type='PERSON' parentNodeUUID={props.parentNode.node_uuid} parentName={props.parentNode.name}
                relationName={''} relationType='CONTRIBUTOR' hideNodeType={false} relationNameInputPlaceholder={"Enter Role (e.g. Director)"}></NewNodeModal>

        </div>
    );
}

export default ContributorSection;
