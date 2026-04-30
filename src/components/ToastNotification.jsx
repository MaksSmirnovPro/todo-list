import React, { useEffect, useState } from 'react';
import './ToastNotification.css';

const ToastNotification = ({ message, type = 'warning', duration = 1500, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200); // уменьшил с 300 до 200мс
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast-notification toast-${type} slide-in`}>
      <div className="toast-content">
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={() => {
        setIsVisible(false);
        setTimeout(onClose, 200);
      }}>×</button>
    </div>
  );
};

export default ToastNotification;