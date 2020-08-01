import React from 'react';
import './SessionSection.css';
import Session from './Session/Session';
import SubsectionNewButton from '../../SubsectionNewButton/SubsectionNewButton';

function SessionSection(props) {
    const sessions = props.sessions.map((s, i) => <Session key={"session" + i} date={s.start_time} start_time={s.start_time}
        end_time={s.end_time} rating={s.rating} markdown_content={s.markdown_content} node_uuid={s.node_uuid}></Session>);

    return (
        <div className="SessionSection">
            <h1>Sessions</h1>
            {sessions}
            <div className="buttonSection">
                <SubsectionNewButton clickFunction={props.clickFunction} relationName={"Session"}></SubsectionNewButton>
            </div>
        </div>
    );
}

export default SessionSection;
