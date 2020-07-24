import React from 'react';
import './DateSelector.css'


function DateSelector(props) {
    return (
        <div className="DateSelector">
            <i class="fas fa-arrow-circle-left"></i>
            <span className="date">{props.date}</span>
            <i class="fas fa-arrow-circle-right"></i>
        </div>
    );
}

export default DateSelector;
