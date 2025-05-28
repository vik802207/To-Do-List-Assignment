import React, { useState } from 'react';
import './TodoItem.css';

const priorityColors = {
  High: 'red',
  Medium: 'orange',
  Low: 'green',
};

const TodoItem = ({ task, onDelete, onToggle, onSubtaskAdd, onSubtaskToggle, onSubtaskDelete }) => {
  const [subtaskInput, setSubtaskInput] = useState('');

  const handleAddSubtask = (e) => {
    e.preventDefault();
    const text = subtaskInput.trim();
    if (text) {
      onSubtaskAdd(task.id, text);
      setSubtaskInput('');
    }
  };

  return (
    <li className="todo-item">
      <div
        className="todo-item-main"
        onClick={() => onToggle(task.id)}
      >
        <div>
          <span className={`todo-item-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
          <div className="todo-item-details">
            {task.dueDate && (
              <span style={{ marginRight: 12 }}>
                📅 Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            <span style={{ color: priorityColors[task.priority], fontWeight: 'bold' }}>
              {task.priority} Priority
            </span>
          </div>
        </div>
        <button
          className="todo-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>

      {/* Subtasks list */}
      {task.subtasks && task.subtasks.length > 0 && (
        <ul className="subtask-list">
          {task.subtasks.map((subtask) => (
            <li
              key={subtask.id}
              className={`subtask-item ${subtask.completed ? 'completed' : ''}`}
              onClick={() => onSubtaskToggle(task.id, subtask.id)}
            >
              <span>{subtask.text}</span>
              <button
                className="subtask-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubtaskDelete(task.id, subtask.id);
                }}
                aria-label="Delete subtask"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Subtask input */}
      <form className="subtask-form" onSubmit={handleAddSubtask}>
        <input
          type="text"
          className="subtask-input"
          placeholder="Add subtask..."
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
        />
        <button type="submit" className="subtask-add-btn">Add</button>
      </form>
    </li>
  );
};

export default TodoItem;
