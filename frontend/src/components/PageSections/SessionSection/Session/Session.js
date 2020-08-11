import React from 'react';
import './Session.css';
import moment from 'moment';
import Stars from '../../../Stars/Stars';
import { Link } from 'react-router-dom';

function Session(props) {
    return (
        <div className="Session">
            <Link to={`/nodes/${props.node_uuid}`} className="sessionHeader">
                <div className="date">{moment.unix(props.date).format("YYYY-MM-DD")}</div>
                <div className="time">
                    <span className="startTime">{moment.unix(props.start_time).format("h:mm A")}</span> - <span className="endTime">{moment.unix(props.end_time).format("h:mm A")}</span>
                </div>
                <Stars rating={props.rating}></Stars>
            </Link>
            <span className="comments">
                {props.markdown_content}
            </span>
        </div>
    );
}

export default Session;
