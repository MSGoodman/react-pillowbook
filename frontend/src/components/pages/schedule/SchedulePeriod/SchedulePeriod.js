import React from 'react';
import './SchedulePeriod.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import Stars from '../../../Stars/Stars';

function SchedulePeriod(props) {
    return (
        <div className="SchedulePeriod">
            <div className="timeSection">
                {moment.unix(props.startTime).format("h:mm A")} - {moment.unix(props.endTime).format("h:mm A")}
            </div>
            <Link to={`/nodes/${props.parentNodeUUID}`}>
                <div className="iconSection">
                    <i className={props.icon}></i>
                </div>
                <div className="nameSection">{props.name}</div>
            </Link>
            <span className="stars">
                (<Stars rating={props.rating}></Stars>)
            </span>

        </div>
    );
}

export default SchedulePeriod;
