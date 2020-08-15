import React, { useState } from 'react';
import NewNodeButton from '../NewNodeButton/NewNodeButton';
import { buttons, nodeTypes } from '../../../../utils/utils';
import './CreatePage.css'
import NewNodeModal from '../../../NewNodeModal/NewNodeModal';

function CreatePage() {
    let prevCategory = null;
    const [newNodeType, setNewNodeType] = useState('');
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);

    return (
        <div className="CreatePage" id="CreatePage">
            {buttons.map((button, index) => {
                const elems = [];
                if (button.category !== prevCategory) {
                    prevCategory = button.category;
                    elems.push(<p key={"category" + index} className="category">{button.category}</p>)
                }

                elems.push(<NewNodeButton clickFunction={
                    () => {
                        setNewNodeType(button.type);
                        setIsNewNodeModalOpen(true);
                    }} key={"createButton" + index} type={button.type} name={button.name} icon={button.icon} tooltip={button.tooltip}></NewNodeButton>);
                return elems;
            })}
            <NewNodeModal hideCreatingAs={true} parentID="CreatePage" nodeTypes={nodeTypes} isOpen={isNewNodeModalOpen} close={() => setIsNewNodeModalOpen(false)}
                type={newNodeType}></NewNodeModal>

        </div>
    );
}

export default CreatePage;
