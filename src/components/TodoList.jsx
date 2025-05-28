import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, onDelete, onToggle, onSubtaskAdd, onSubtaskToggle, onSubtaskDelete }) => {
  if (tasks.length === 0) return <p className="empty-msg">No tasks here. 🎉</p>;

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onSubtaskAdd={onSubtaskAdd}
          onSubtaskToggle={onSubtaskToggle}
          onSubtaskDelete={onSubtaskDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
