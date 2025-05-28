import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd({ text: input, dueDate, priority });
    setInput('');
    setDueDate('');
    setPriority('Medium');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        placeholder="📝 Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <input
        className="form-date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        className="form-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">🟢 Low Priority</option>
        <option value="Medium">🟡 Medium Priority</option>
        <option value="High">🔴 High Priority</option>
      </select>
      <button className="form-btn" type="submit">➕ Add</button>
    </form>
  );
};

export default TodoForm;
