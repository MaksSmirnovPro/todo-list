import React, { useState, useMemo } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Controls from './components/Controls';
import ToastNotification from './components/ToastNotification';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useNotification } from './hooks/useNotification';
import { Task, priorityOrder } from './utils/helpers';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('todoAppTasks', []);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const { notifications, showNotification, removeNotification } = useNotification();
  

  const addTask = (text, priority, createdAt) => {
  const newTask = new Task(Date.now(), text, false, priority, createdAt);
  setTasks([...tasks, newTask]);
  showNotification('✅ Задача успешно добавлена!', 'success', 1500); // было 2500
};

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showNotification('🗑️ Задача удалена', 'info', 1200); // было 2000
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    const task = tasks.find(t => t.id === id);
    if (task) {
      const status = !task.completed ? 'выполнена' : 'активна';
      showNotification(`📝 Задача помечена как ${status}`, 'success', 1200); // было 2000
    }
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
    showNotification('✏️ Задача успешно отредактирована', 'success', 1500); // было 2500
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
    showNotification('🧹 Выполненные задачи очищены', 'success', 1500); // было 2500
  };

  const processedTasks = useMemo(() => {
    let filtered = [...tasks];

    if (filter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    if (sort === 'alphabet') {
      filtered.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sort === 'priority') {
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === 'date') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  }, [tasks, filter, sort]);

  const remainingCount = tasks.filter(t => !t.completed).length;
  const hasCompleted = tasks.some(t => t.completed);

  const highCount = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const mediumCount = tasks.filter(t => t.priority === 'medium' && !t.completed).length;
  const lowCount = tasks.filter(t => t.priority === 'low' && !t.completed).length;

  
  return (
    <div className="container">
      <div className="header">
        <h1>
          <span className="header-icon">✅</span>
          To Do List
        </h1>
        <p className="subtitle">Организуй свои задачи с умом</p>
      </div>
      
      <TaskInput onAddTask={addTask} showNotification={showNotification} />
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{remainingCount}</div>
          <div className="stat-label">Активных задач</div>
        </div>
        <div className="stat-card priority-high-stat">
          <div className="stat-value">{highCount}</div>
          <div className="stat-label">🔴 Высокий приоритет</div>
        </div>
        <div className="stat-card priority-medium-stat">
          <div className="stat-value">{mediumCount}</div>
          <div className="stat-label">🟡 Средний приоритет</div>
        </div>
        <div className="stat-card priority-low-stat">
          <div className="stat-value">{lowCount}</div>
          <div className="stat-label">🟢 Низкий приоритет</div>
        </div>
      </div>
      
      <Controls
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        onClearCompleted={clearCompleted}
        hasCompleted={hasCompleted}
        showNotification={showNotification}
      />
      
      <TaskList
        tasks={processedTasks}
        onToggle={toggleComplete}
        onDelete={deleteTask}
        onEdit={editTask}
        showNotification={showNotification}
/>
      
      <footer className="footer">
        <div className="footer-content">
          <p className="developer-info">
            Разработано на 
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="react-link">
              <span className="react-icon">⚛️ React</span>
            </a>
            by 
            <a href="https://github.com/MaksSmirnovPro" target="_blank" rel="noopener noreferrer" className="developer-link">
              <svg className="github-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              MaksSmirnovPro
            </a>
          </p>
          <p className="copyright">
            © {new Date().getFullYear()} To Do List — Все задачи под контролем
          </p>
        </div>
      </footer>

      {/* Отображение уведомлений */}
      {notifications.map(notification => (
        <ToastNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

export default App;