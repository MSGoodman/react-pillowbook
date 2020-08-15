import React from 'react';
import './TaskLine.scss'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { updateTask } from '../../../../../utils/api';

function TaskLine(props) {
    function updateTaskStatus() {
        const updatedTask = { ...props.task };
        console.log(updatedTask.status)
        updatedTask.status = updatedTask.status == 'COMPLETE' ? 'TODO' : 'COMPLETE';
        console.log(updatedTask.status)
        updateTask(updatedTask).then(updated => props.setNewestUpdate(updatedTask.task_uuid + ' status set to ' + updatedTask.status));
    }

    const checkbox = props.task.status == 'COMPLETE' ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>;

    const finishButton = !props.endTime ? <button onClick={updateTaskStatus} className="finishSessionButton"> <i class="fas fa-hourglass-end"></i> End Session </button> : null;

    return (
        <div className="TaskLine">
            <button className="taskButton" onClick={updateTaskStatus}> {checkbox} </button>
            <Link className="taskLink" to={`/nodes/${props.task.parent_node_uuid}`}>
                <div className="taskIcon">
                    <i className={props.task.icon}></i>
                </div>
                <div className="taskName">{props.task.name}</div>
                <span className="taskRank">{props.task.rank}</span> {/* For debugging only */}
            </Link>
        </div>
    );
}

export default TaskLine;
