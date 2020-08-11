import React, { useState, useEffect } from 'react';
import './SchedulePage.css'
import DateSelector from '../DateSelector/DateSelector';
import SchedulePeriod from '../SchedulePeriod/SchedulePeriod';
import NewSchedulePeriodButton from '../NewSchedulePeriodButton/NewSchedulePeriodButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SchedulePage() {
    const [sessions, setSessions] = useState([]);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetch(`http://localhost:9000/sessions?date=${date}`)
            .then(res => res.json())
            .then(data => setSessions(data))
    }, [date]);

    const sessionElements = sessions.map((t, i) => <SchedulePeriod key={t.session_node} startTime={t.start_time} endTime={t.end_time} name={t.name}></SchedulePeriod>)

    return (
        <div className="SchedulePage">
            <DatePicker
                selected={date}
                onChange={d => setDate(d)}
            />
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
            <NewSchedulePeriodButton></NewSchedulePeriodButton>
        </div>
    );
}

export default SchedulePage;
