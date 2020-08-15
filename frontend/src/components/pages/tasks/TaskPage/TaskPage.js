import React, { useState, useEffect } from 'react';
import './TaskPage.scss';
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import { arrayMove } from '../../../../utils/utils'
import TaskLine from './TaskLine/TaskLine';
import { updateTask } from '../../../../utils/api';

function TaskPage() {
    function sortTasks(tasks) {
        return tasks.sort((a, b) => {
            let comparison = 0;
            if (a.rank > b.rank) comparison = 1;
            else if (a.rank < b.rank) comparison = -1;
            return comparison;
        })
    }

    const [tasks, setTasks] = useState([]);
    const [newestUpdate, setNewestUpdate] = useState('');

    useEffect(() => {
        fetch(`http://localhost:9000/tasks`)
            .then(res => res.json())
            .then(data => setTasks(sortTasks(data)))
    }, [newestUpdate]);

    const DragHandle = sortableHandle(() => <span className="dragHandle"><i className="fas fa-bars"></i></span>);

    const SortableItem = sortableElement(({ task }) => (
        <div className="sortableTask">
            <DragHandle />
            <TaskLine task={task} setNewestUpdate={setNewestUpdate}></TaskLine>
        </div>
    ));

    const SortableContainer = sortableContainer(({ children }) => {
        return <div className="taskContainer">{children}</div>;
    });

    const onSortEnd = ({ oldIndex, newIndex }) => {
        console.log("New Index: " + newIndex)
        const lowerTask = tasks[newIndex - 1]
        const higherTask = tasks[newIndex]

        console.log("Lower Task: " + JSON.stringify(lowerTask))
        console.log("Higher Task: " + JSON.stringify(higherTask))
        console.log(newIndex + 1 == tasks.length)

        const lowerRank = newIndex + 1 == tasks.length ? tasks[newIndex].rank + 1 : lowerTask.rank  // newIndex == 0 ? 0 : tasks[newIndex].rank
        const higherRank = newIndex == 0 ? 0 : higherTask.rank
        const newRank = (lowerRank + higherRank) / 2

        console.log("Higher Rank: " + higherRank)
        console.log("New Rank: " + newRank)
        console.log("Lower Rank: " + lowerRank)

        const updatedTask = { ...tasks[oldIndex] }
        updatedTask.rank = newRank;
        updateTask(updatedTask).then(updated => setNewestUpdate(updatedTask.task_uuid + new Date()))
    };

    return (
        <div className="TaskPage">
            <h1>Tasks</h1>
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {tasks.map((t, i) => <SortableItem index={i} task={t} />)}
            </SortableContainer>
        </div>
    );
}

export default TaskPage;
