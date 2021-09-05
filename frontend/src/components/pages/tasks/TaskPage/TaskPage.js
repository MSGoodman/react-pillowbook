import React, { useState, useEffect } from 'react';
import './TaskPage.scss';
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import TaskLine from './TaskLine/TaskLine';
import { updateTask } from '../../../../utils/api';
import NewNodeModal from '../../../NewNodeModal/NewNodeModal';
import SubsectionNewButton from '../../../SubsectionNewButton/SubsectionNewButton'

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
    const [isNewNodeModalOpen, setIsNewNodeModalOpen] = useState(false);

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
        const taskToUpdate = { ...tasks[oldIndex] }

        // If this isn't being moved at all, leave the rank the same
        if (newIndex === oldIndex)
        {
            // No-op
        }
        // If this is being moved to the bottom, just bump the rank by one
        else if (newIndex + 1 === tasks.length)
        {
            taskToUpdate.rank = tasks.length + 1;
        }
        // If it's being moved to the top, make the rank halfway between the bottom rank and 0
        else if (newIndex === 0)
        {
            const higherTaskRank = tasks[newIndex].rank;
            taskToUpdate.rank = higherTaskRank / 2;
        }
        // Otherwise, calculate the midpoint between the upper and lower ranks
        else 
        {
            const higherTask = newIndex < oldIndex ? tasks[newIndex - 1] : tasks[newIndex];
            const lowerTask = newIndex < oldIndex ? tasks[newIndex] : tasks[newIndex + 1]
            const newRank = (higherTask.rank + lowerTask.rank) / 2
            
            taskToUpdate.rank = newRank;
        }

        updateTask(taskToUpdate).then(updated => setNewestUpdate(taskToUpdate.task_uuid + new Date()))
    };

    return (
        <div className="TaskPage">
            <h1>Tasks</h1>
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {tasks.map((t, i) => <SortableItem index={i} task={t} />)}
            </SortableContainer>

            <SubsectionNewButton clickFunction={() => setIsNewNodeModalOpen(true)}></SubsectionNewButton>

            <NewNodeModal
                isOpen={isNewNodeModalOpen}
                close={() => setIsNewNodeModalOpen(false)}
                name=""
                type={'TASK'}
                setNewestAddedNode={setNewestUpdate}
                hideCreatingAs={true}
                hideNodeType={true}>
            </NewNodeModal>
        </div>
    );
}

export default TaskPage;
