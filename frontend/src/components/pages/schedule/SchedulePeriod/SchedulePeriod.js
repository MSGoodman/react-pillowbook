import React from 'react';
import './SchedulePeriod.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import Stars from '../../../Stars/Stars';
import { updateSession } from '../../../../utils/api';

function SchedulePeriod(props) {
    function updateEndTime() {
        const updatedSession = { ...props.session };
        updatedSession.end_time = Math.floor(Date.now() / 1000);
        updateSession(updatedSession).then(updated => props.setNewestAddedNode('Ended: ' + props.session.node_uuid));
    }

    const endTimePart = props.endTime ? " - " + moment.unix(props.endTime).format("h:mm A") : '...';
    const finishButton = !props.endTime ? <button onClick={updateEndTime} className="finishSessionButton"> <i class="fas fa-hourglass-end"></i> End Session </button> : null;

    return (
        <div className="SchedulePeriod">
            <div className="timeSection">
                {moment.unix(props.startTime).format("h:mm A")} {endTimePart}
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
            {finishButton}

        </div>
    );
}

export default SchedulePeriod;
