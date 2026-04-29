import React from 'react';
import './Controls.css';

const Controls = ({ 
  filter, onFilterChange, 
  sort, onSortChange, 
  onClearCompleted, 
  hasCompleted 
}) => {
  return (
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
        <button onClick={onClearCompleted} className="clear-completed">
          🗑️ Очистить выполненные
        </button>
      )}
    </div>
  );
};

export default Controls;