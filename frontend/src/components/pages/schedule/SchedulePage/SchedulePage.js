import React, { useState, useEffect } from 'react';
import './SchedulePage.scss'
import SchedulePeriod from '../SchedulePeriod/SchedulePeriod';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NewNodeModal from '../../../NewNodeModal/NewNodeModal';
import SubsectionNewButton from '../../../SubsectionNewButton/SubsectionNewButton'

function SchedulePage() {
    function addDays(date, numOfDays) {
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + numOfDays);
        return tomorrow;
    }

    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);
    const [newestAddedNode, setNewestAddedNode] = useState('');

    useEffect(() => {
        fetch(`http://localhost:9000/sessions?date=${date}`)
            .then(res => res.json())
            .then(data => setSessions(data))
    }, [date, newestAddedNode]);

    console.log(sessions)
    const sessionElements = sessions ?
        sessions.map((t, i) => <SchedulePeriod key={t.session_node} setNewestAddedNode={setNewestAddedNode} session={t} rating={t.rating} parentNodeUUID={t.parent_node_uuid} icon={t.icon} startTime={t.start_time} endTime={t.end_time} name={t.name}></SchedulePeriod>)
        : null;

    return (
        <div className="SchedulePage">
            <div className="dateSelector">
                <div className="dateButtons">
                    <button className="dateButton" onClick={() => setDate(addDays(date, -1))}><i class="fas fa-arrow-alt-circle-left"></i></button>
                    <button className="todayButton" onClick={() => setDate(new Date())}>Today</button>
                    <button className="dateButton" onClick={() => setDate(addDays(date, 1))}><i class="fas fa-arrow-alt-circle-right"></i></button>
                </div>
                <DatePicker
                    selected={date}
                    onChange={d => setDate(d)}
                />
            </div>
            {sessionElements}
            <SubsectionNewButton clickFunction={() => setIsNewNodeModalOpen(true)}></SubsectionNewButton>

            <NewNodeModal
                isOpen={isNewNodeModalOpen}
                close={() => setIsNewNodeModalOpen(false)}
                name=""
                type={'SESSION'}
                relationName={'Session'}
                relationType={'SESSION'}
                setNewestAddedNode={setNewestAddedNode}
                hideNodeType={true}>
            </NewNodeModal>
        </div>
    );
}

export default SchedulePage;
