import React from 'react';
import './SchedulePage.css'
import DateSelector from '../DateSelector/DateSelector';
import SchedulePeriod from '../SchedulePeriod/SchedulePeriod';
import NewSchedulePeriodButton from '../NewSchedulePeriodButton/NewSchedulePeriodButton';


function SchedulePage() {
    return (
        <div className="SchedulePage">
            <DateSelector date="7/2/20"></DateSelector>
            <SchedulePeriod icon="fas fa-utensils" startTime="8:00am" endTime="8:30am" name="Breakfast"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-hands-wash" startTime="8:30am" endTime="9:00am" name="Shower"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-gamepad" startTime="9:00am" endTime="10:30am" name="Horizon: Zero Dawn"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-hands-wash" startTime="10:45am" endTime="11:00am" name="Review Tickets"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-phone-volume" startTime="11:00am" endTime="11:30am" name="Daily Standup"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-briefcase" startTime="11:30am" endTime="1:00pm" name="Task 1"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-utensils" startTime="1:00pm" endTime="1:30pm" name="Lunch"></SchedulePeriod>
            <SchedulePeriod icon="fas fa-briefcase" startTime="1:30pm" endTime="2:30pm" name="Task 2"></SchedulePeriod>
            <NewSchedulePeriodButton></NewSchedulePeriodButton>
        </div>
    );
}

export default SchedulePage;
