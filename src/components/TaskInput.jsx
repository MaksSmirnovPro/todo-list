import React, { useState } from 'react';
import './TaskInput.css';

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Пожалуйста, введите задачу!');
      return;
    }
    if (text.length > 100) {
      alert('Задача не может превышать 100 символов!');
      return;
    }
    
    let createdAt = null;
    if (date) {
      createdAt = new Date(`${date}T${time || '12:00'}`).toISOString();
    }
    
    onAddTask(text.trim(), priority, createdAt);
    setText('');
    setPriority('medium');
    setDate('');
    setTime('');
  };

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
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
          placeholder="Дата"
        />
        
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="time-input"
          placeholder="Время"
        />
        
        <button type="submit" className="add-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Добавить
        </button>
      </div>
    </form>
  );
};

export default TaskInput;