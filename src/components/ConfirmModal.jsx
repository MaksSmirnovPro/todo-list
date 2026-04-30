import React, { useEffect } from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message, confirmText = 'Удалить', cancelText = 'Отмена' }) => {
  
  // Закрытие по клавише ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    // Блокировка скролла фона при открытом модальном окне
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onCancel]);

  // Закрытие по клавише Enter (подтверждение)
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === 'Enter' && isOpen) {
        e.preventDefault();
        onConfirm();
      }
    };
    
    window.addEventListener('keydown', handleEnter);
    
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onCancel}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <div className="confirm-modal-icon">⚠️</div>
          <h3>{title}</h3>
          <button className="confirm-modal-close" onClick={onCancel}>
            ×
          </button>
        </div>
        <div className="confirm-modal-body">
          <p>{message}</p>
          <div className="confirm-modal-hint">
            <div className="hint-item">
              <span className="hint-key">Enter</span>
              <span className="hint-text">Подтвердить удаление</span>
            </div>
            <div className="hint-item">
              <span className="hint-key">Esc</span>
              <span className="hint-text">Отмена</span>
            </div>
          </div>
        </div>
        <div className="confirm-modal-footer">
          <button onClick={onCancel} className="confirm-modal-cancel-btn">
            ❌ {cancelText}
          </button>
          <button onClick={onConfirm} className="confirm-modal-confirm-btn">
            🗑️ {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;