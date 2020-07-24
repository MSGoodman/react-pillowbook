import React from 'react';
import './SessionSection.css';
import Session from './Session/Session';
import SubsectionNewButton from '../../../SubsectionNewButton/SubsectionNewButton';

function SessionSection(props) {
    const sessions = props.sessions.map((r) => <Session date={r.date} startTime={r.startTime}
        endTime={r.endTime} rating={r.rating} comments={r.comments}></Session>);

    return (
        <div className="SessionSection">
            <h1>Sessions</h1>
            {sessions}
            <SubsectionNewButton></SubsectionNewButton>
        </div>
    );
}

export default SessionSection;
