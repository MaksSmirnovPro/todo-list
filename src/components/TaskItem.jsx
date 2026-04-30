import React, { useState } from 'react';
import EditModal from './EditModal';
import ConfirmModal from './ConfirmModal';
import { getPriorityText, getPriorityIcon } from '../utils/helpers';
import './TaskItem.css';

const formatDate = (createdAt) => {
  if (!createdAt) return null;
  
  const date = new Date(createdAt);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  
  if (date.toDateString() === today.toDateString()) {
    return `Сегодня в ${time}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Вчера в ${time}`;
  } else {
    return `${date.toLocaleDateString('ru-RU')} в ${time}`;
  }
};

const TaskItem = ({ task, onToggle, onDelete, onEdit, showNotification }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (newText) => {
    onEdit(task.id, newText);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setIsDeleteModalOpen(false);
  };

  const formattedDate = formatDate(task.createdAt);

  return (
    <>
      <li className={`todo-item priority-${task.priority} ${task.completed ? 'completed-item' : ''}`}>
        <div className="todo-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="todo-checkbox"
          />
          
          <div className="todo-content">
            <span className={`todo-text ${task.completed ? 'completed' : ''}`}>
              {task.text}
            </span>
            <div className="todo-meta">
              <span className={`priority-badge priority-${task.priority}`}>
                {getPriorityIcon(task.priority)} {getPriorityText(task.priority)}
              </span>
              {formattedDate && (
                <span className="date-badge">
                  📅 {formattedDate}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="todo-actions">
          <button onClick={() => setIsEditModalOpen(true)} className="edit-btn" title="Редактировать">
            ✏️
          </button>
          <button onClick={() => setIsDeleteModalOpen(true)} className="delete-btn" title="Удалить">
            🗑️
          </button>
        </div>
      </li>
      
      {isEditModalOpen && (
        <EditModal
          task={task}
          onSave={handleEdit}
          onClose={() => setIsEditModalOpen(false)}
          showNotification={showNotification}
        />
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        title="Удаление задачи"
        message={`Вы уверены, что хотите удалить задачу "${task.text}"? Это действие нельзя отменить.`}
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </>
  );
};

export default TaskItem;