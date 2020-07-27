import React from 'react';
import './Session.css';
import moment from 'moment';
import Stars from '../../../Stars/Stars';

function Session(props) {
    return (
        <div className="Session">
            <div className="date">{moment.unix(props.date).format("YYYY-MM-DD")}</div>
            <div className="time">
                <span className="startTime">{moment.unix(props.start_time).format("h:mm:ss A")}</span> - <span className="endTime">{moment.unix(props.end_time).format("h:mm:ss A")}</span>
            </div>
            <Stars rating={props.rating}></Stars>
            <div className="comments">
                {props.markdown_content}
            </div>
        </div>
    );
}

export default Session;
