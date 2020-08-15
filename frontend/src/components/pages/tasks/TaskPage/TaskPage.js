import React, { useState, useEffect } from 'react';
import './TaskPage.css';

function TaskPage() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9000/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, []);

    const taskElements = tasks.map((t, i) => <div>{t.name}</div>)

    return (
        <div className="TaskPage">
            {taskElements}
        </div>
    );
}

export default TaskPage;
