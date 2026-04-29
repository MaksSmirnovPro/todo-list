import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return <div className="empty-state">Нет задач для отображения</div>;
  }

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TaskList;