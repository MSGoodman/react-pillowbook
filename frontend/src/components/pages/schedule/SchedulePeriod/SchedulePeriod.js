import React from 'react';
import './SchedulePeriod.css'
import moment from 'moment';

function SchedulePeriod(props) {
    return (
        <div className="SchedulePeriod">
            <div className="timeSection">
                {moment.unix(props.startTime).format("h:mm A")} - {moment.unix(props.endTime).format("h:mm A")}
            </div>
            <div className="iconSection">
                <i className={props.icon}></i>
            </div>
            <div className="nameSection">{props.name}</div>
        </div>
    );
}

export default SchedulePeriod;
