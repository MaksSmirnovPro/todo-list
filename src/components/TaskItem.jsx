import React, { useState } from 'react';
import { getPriorityText, getPriorityIcon } from '../utils/helpers';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (!editText.trim()) {
      alert('Текст задачи не может быть пустым!');
      return;
    }
    if (editText.length > 100) {
      alert('Задача не может превышать 100 символов!');
      return;
    }
    onEdit(task.id, editText.trim());
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  return (
    <li className={`todo-item priority-${task.priority} ${task.completed ? 'completed-item' : ''}`}>
      <div className="todo-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="edit-input"
              autoFocus
              maxLength="100"
            />
            <button onClick={handleSaveEdit} className="save-btn">💾 Сохранить</button>
          </div>
        ) : (
          <div className="todo-content">
            <span className={`todo-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <div className="todo-meta">
              <span className={`priority-badge priority-${task.priority}`}>
                {getPriorityIcon(task.priority)} {getPriorityText(task.priority)}
              </span>
              {task.createdAt && (
                <span className="date-badge">
                  📅 {task.getFormattedDate()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="todo-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="edit-btn" title="Редактировать">
            ✏️
          </button>
        )}
        <button onClick={() => onDelete(task.id)} className="delete-btn" title="Удалить">
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TaskItem;