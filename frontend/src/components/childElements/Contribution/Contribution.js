import React from 'react';
import './Contribution.css';
import moment from 'moment';
import Stars from '../../Stars/Stars';
import { Link } from 'react-router-dom';

function Contribution(props) {
    return (
        <div className="Contribution">
            {props.node.name}
        </div>
    );
}

export default Contribution;
