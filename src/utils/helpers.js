export class Task {
  constructor(id, text, completed = false, priority = 'medium', createdAt = null) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.priority = priority;
    this.createdAt = createdAt || new Date().toISOString();
  }

  getFormattedDate() {
    const date = new Date(this.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Форматирование времени
    const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    
    // Проверка на сегодня/вчера
    if (date.toDateString() === today.toDateString()) {
      return `Сегодня в ${time}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Вчера в ${time}`;
    } else {
      return `${date.toLocaleDateString('ru-RU')} в ${time}`;
    }
  }
}

export const getPriorityText = (priority) => {
  const map = { 
    high: 'Высокий', 
    medium: 'Средний', 
    low: 'Низкий' 
  };
  return map[priority] || 'Средний';
};

export const getPriorityIcon = (priority) => {
  const map = { 
    high: '🔴', 
    medium: '🟡', 
    low: '🟢' 
  };
  return map[priority] || '🟡';
};

export const priorityOrder = { high: 1, medium: 2, low: 3 };