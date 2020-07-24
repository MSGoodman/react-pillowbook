import React from 'react';
import NewNodeButton from '../NewNodeButton/NewNodeButton';
import { buttons } from '../../../../utils/utils';
import './CreatePage.css'


function CreatePage() {
    let prevCategory = null;

    return (
        <div className="CreatePage">
            {buttons.map((button, index) => {
                const elems = [];
                if (button.category !== prevCategory) {
                    prevCategory = button.category;
                    elems.push(<p className="category">{button.category}</p>)
                }

                elems.push(<NewNodeButton name={button.name} icon={button.icon} tooltip={button.tooltip}></NewNodeButton>);
                return elems;
            })}
        </div>
    );
}

export default CreatePage;
