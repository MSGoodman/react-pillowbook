import React from 'react';
import './Session.css';
import Stars from '../../../../Stars/Stars';

function Session(props) {
    return (
        <div className="Session">
            <div className="date">{props.date}</div>
            <div className="time">
                <span className="startTime">{props.startTime}</span> - <span className="endTime">{props.endTime}</span>
            </div>
            <Stars rating={props.rating}></Stars>
            <div className="comments">
                {props.comments}
            </div>
        </div>
    );
}

export default Session;
