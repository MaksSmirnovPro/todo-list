import React, { useState } from 'react';
import './TaskInput.css';

const TaskInput = ({ onAddTask, showNotification }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDateTime, setShowDateTime] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      showNotification('⚠️ Пожалуйста, введите текст задачи!', 'warning', 1500);
      return;
    }
    
    if (text.length > 100) {
      showNotification('❌ Задача не может превышать 100 символов!', 'error', 1500);
      return;
    }
    
    let createdAt = null;
    if (date && time) {
      createdAt = new Date(`${date}T${time}`).toISOString();
    } else if (date) {
      createdAt = new Date(`${date}T12:00`).toISOString();
    }
    
    onAddTask(text.trim(), priority, createdAt);
    setText('');
    setPriority('medium');
    setDate('');
    setTime('');
    setShowDateTime(false);
  };

  // Получаем сегодняшнюю дату в формате YYYY-MM-DD для атрибута min
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="input-section" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать? (макс. 100 символов)"
          maxLength="100"
          className="task-input"
        />
      </div>
      
      <div className="input-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">🟢 Низкий приоритет</option>
          <option value="medium">🟡 Средний приоритет</option>
          <option value="high">🔴 Высокий приоритет</option>
        </select>
        
        <button 
          type="button"
          onClick={() => setShowDateTime(!showDateTime)}
          className="datetime-toggle-btn"
        >
          📅 {showDateTime ? 'Скрыть дату' : 'Добавить дату'}
        </button>
        
        <button type="submit" className="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Добавить
        </button>
      </div>
      
      {showDateTime && (
        <div className="datetime-row">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
            min={today}
            pattern="\d{4}-\d{2}-\d{2}"
          />
          
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="time-input"
            step="60"
          />
        </div>
      )}
    </form>
  );
};

export default TaskInput;