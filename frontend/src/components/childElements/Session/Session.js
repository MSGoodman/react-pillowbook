import React from 'react';
import './Session.css';
import moment from 'moment';
import Stars from '../../Stars/Stars';
import { Link } from 'react-router-dom';

function Session(props) {
    const endTimePart = props.node.session_end ? " - " + moment.unix(props.node.session_end).format("h:mm A") : '...';


    return (
        <div className="Session">
            <Link to={`/nodes/${props.node.node_uuid}`} className="sessionHeader">
                <div className="date">{moment.unix(props.node.session_start).format("YYYY-MM-DD")}</div>
                <div className="time">
                    <span className="startTime">{moment.unix(props.node.session_start).format("h:mm A")}</span> <span className="endTime">{endTimePart}</span>
                </div>
                <Stars rating={props.node.session_rating}></Stars>
            </Link>
            <span className="comments">
                {props.node.markdown_content}
            </span>
        </div>
    );
}

export default Session;
