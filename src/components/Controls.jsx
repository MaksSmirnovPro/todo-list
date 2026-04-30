import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import './Controls.css';

const Controls = ({ 
  filter, onFilterChange, 
  sort, onSortChange, 
  onClearCompleted, 
  hasCompleted 
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClearClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmClear = () => {
    onClearCompleted();
    setShowConfirmModal(false);
  };

  const handleCancelClear = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="controls">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            📋 Все
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => onFilterChange('active')}
          >
            ⏳ Активные
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            ✅ Выполненные
          </button>
        </div>
        
        <div className="sort-section">
          <label className="sort-label">Сортировать:</label>
          <select value={sort} onChange={(e) => onSortChange(e.target.value)} className="sort-select">
            <option value="default">📌 По умолчанию</option>
            <option value="alphabet">🔤 По алфавиту</option>
            <option value="priority">⚡ По приоритету</option>
            <option value="date">📅 По дате создания</option>
          </select>
        </div>
        
        {hasCompleted && (
          <button onClick={handleClearClick} className="clear-completed">
            🗑️ Очистить выполненные
          </button>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
        title="Подтверждение удаления"
        message="Вы уверены, что хотите удалить все выполненные задачи? Это действие нельзя отменить."
        confirmText="Удалить все"
        cancelText="Отмена"
      />
    </>
  );
};

export default Controls;