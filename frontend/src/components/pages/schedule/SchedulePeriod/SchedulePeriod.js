import React from 'react';
import './SchedulePeriod.css'

function SchedulePeriod(props) {
    return (
        <div className="SchedulePeriod">
            <div className="timeSection">
                {props.startTime} - {props.endTime}
            </div>
            <div className="iconSection">
                <i className={props.icon}></i>
            </div>
            <div className="nameSection">{props.name}</div>
        </div>
    );
}

export default SchedulePeriod;
