import React, { useState, useEffect, useRef } from 'react';
import './EditModal.css';

const EditModal = ({ task, onSave, onClose, showNotification }) => {
  const [editText, setEditText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (task && task.text) {
      setEditText(task.text);
    }
  }, [task]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    };
    
    window.addEventListener('keydown', handleEnter);
    
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [editText]);

    const handleSave = () => {
    if (!editText.trim()) {
        showNotification('⚠️ Пожалуйста, введите текст задачи!', 'warning', 1500);
        return;
    }
    
    if (editText.length > 100) {
        showNotification('❌ Задача не может превышать 100 символов!', 'error', 1500);
        return;
    }
    
    if (editText.trim() === task.text) {
        showNotification('ℹ️ Вы не изменили текст задачи. Внесите изменения для сохранения.', 'info', 1500);
        return;
    }
    
    onSave(editText.trim());
    onClose();
    };

  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-icon">✏️</div>
          <h3>Редактировать задачу</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="modal-input"
            maxLength="100"
            placeholder="Введите текст задачи..."
          />
          
          {/* Улучшенная плашка с текущим текстом */}
          <div className="modal-current-text-card">
            <div className="current-text-label">
              <span className="current-text-icon">📝</span>
              <span>Текущий текст</span>
            </div>
            <div className="current-text-content">
              {task.text}
            </div>
          </div>
          
          <div className="modal-hint">
            <div className="hint-item">
              <span className="hint-key">Enter</span>
              <span className="hint-text">Сохранить</span>
            </div>
            <div className="hint-item">
              <span className="hint-key">Esc</span>
              <span className="hint-text">Отмена</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-cancel-btn">
            ❌ Отмена
          </button>
          <button onClick={handleSave} className="modal-save-btn">
            💾 Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;