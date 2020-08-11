import React, { useState, useEffect } from 'react';
import './SchedulePage.scss'
import DateSelector from '../DateSelector/DateSelector';
import SchedulePeriod from '../SchedulePeriod/SchedulePeriod';
import NewSchedulePeriodButton from '../NewSchedulePeriodButton/NewSchedulePeriodButton';
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

    const sessionElements = sessions.map((t, i) => <SchedulePeriod key={t.session_node} rating={t.rating} parentNodeUUID={t.parent_node_uuid} icon={t.icon} startTime={t.start_time} endTime={t.end_time} name={t.name}></SchedulePeriod>)

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
            {/* <DateSelector date="7/2/20"></DateSelector> */}
            {sessionElements}
            {/* <SchedulePeriod icon="fas fa-utensils" startTime="8:00am" endTime="8:30am" name="Breakfast"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-hands-wash" startTime="8:30am" endTime="9:00am" name="Shower"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-gamepad" startTime="9:00am" endTime="10:30am" name="Horizon: Zero Dawn"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-hands-wash" startTime="10:45am" endTime="11:00am" name="Review Tickets"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-phone-volume" startTime="11:00am" endTime="11:30am" name="Daily Standup"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-briefcase" startTime="11:30am" endTime="1:00pm" name="Task 1"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-utensils" startTime="1:00pm" endTime="1:30pm" name="Lunch"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-briefcase" startTime="1:30pm" endTime="2:30pm" name="Task 2"></SchedulePeriod> */}
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
