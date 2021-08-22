import React from 'react';
import './TaskLine.scss'
import { Link } from 'react-router-dom';
import { updateTask } from '../../../../../utils/api';

function TaskLine(props) {
    function updateTaskStatus() {
        const updatedTask = { ...props.task };
        console.log(updatedTask.status)
        updatedTask.status = updatedTask.status === 'COMPLETE' ? 'TODO' : 'COMPLETE';
        console.log(updatedTask.status)
        updateTask(updatedTask).then(updated => props.setNewestUpdate(updatedTask.task_uuid + ' status set to ' + updatedTask.status));
    }

    const checkbox = props.task.status === 'COMPLETE' ? <i className="far fa-check-square"></i> : <i className="far fa-square"></i>;

    return (
        <div className={"TaskLine task" + props.task.status}>
            <button className="taskButton" onClick={updateTaskStatus}> {checkbox} </button>
            <Link className="taskLink" to={`/nodes/${props.task.parent_node_uuid}`}>
                <div className="taskCategory">{props.task.category_name}</div>
                <div className="taskName">{props.task.name}</div>
                <span className="taskRank">{props.task.rank}</span> {/* For debugging only */}
            </Link>
        </div>
    );
}

export default TaskLine;
