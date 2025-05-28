import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Filter from './Filter';
import { loadTasks, saveTasks } from '../utils/localStorage';
import Login from '../pages/Login'; 
import Signup from '../pages/Signup';
import "./TodoApp.css"

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TodoApp = () => {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState('all');
   const [showSignup, setShowSignup] = useState(false);
   const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') === 'true');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
 // Add logout function
  const logout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={setLoggedIn} onShowSignup={() => setShowSignup(true)} />
    );
  }

  const addTask = ({ text, dueDate, priority }) => {
    if (!text.trim()) return alert("Task can't be empty");
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      dueDate: dueDate || null,
      priority: priority || 'Medium',
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleComplete = (id) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Subtask handlers
  const addSubtask = (taskId, text) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newSubtask = {
          id: Date.now(),
          text,
          completed: false,
        };
        const subtasks = task.subtasks ? [...task.subtasks, newSubtask] : [newSubtask];
        return { ...task, subtasks };
      }
      return task;
    }));
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const subtasks = task.subtasks.map(subtask =>
          subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
        );
        return { ...task, subtasks };
      }
      return task;
    }));
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const subtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
        return { ...task, subtasks };
      }
      return task;
    }));
  };

  // Drag-and-drop handler
  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside list

    // Get filteredTasks because you are displaying filtered tasks
    // But reorder tasks array directly to keep state consistent
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // We need to reorder tasks *based on filteredTasks* indices, so map back:
    // Map filteredTasks order to their ids:
    const filteredTaskIds = filteredTasks.map(t => t.id);

    // Find the task to move based on filtered tasks order
    const movedTaskId = filteredTaskIds[sourceIndex];

    // Find index of movedTask in full tasks array
    const taskIndex = tasks.findIndex(t => t.id === movedTaskId);

    // Remove moved task from tasks array
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(taskIndex, 1);

    // Compute new insert index in tasks array corresponding to destinationIndex in filteredTasks
    // This can be tricky if filter is applied, but simplest way: reorder filteredTasks and then reorder tasks accordingly

    // Remove movedTaskId from filteredTaskIds
    filteredTaskIds.splice(sourceIndex, 1);
    // Insert movedTaskId at destinationIndex
    filteredTaskIds.splice(destinationIndex, 0, movedTaskId);

    // Now build new tasks array respecting filteredTaskIds order for filtered tasks,
    // and keep other tasks (not in filter) in place.

    const newTasksOrder = [];

    filteredTaskIds.forEach(id => {
      const task = tasks.find(t => t.id === id);
      if (task) newTasksOrder.push(task);
    });

    // Add back tasks not in filtered list (usually none if filter is 'all', otherwise append)
    tasks.forEach(t => {
      if (!filteredTaskIds.includes(t.id)) newTasksOrder.push(t);
    });

    setTasks(newTasksOrder);
  };

 return (
  <div className={`todo-container ${darkMode ? 'dark' : 'light'}`}>
    <div className="todo-header">
      <h1>✨ To-Do List</h1>
      <div className="header-actions">
        <button className="glass-btn" onClick={logout}>Logout</button>
        <button className="glass-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>

    <div className="todo-glass">
      <TodoForm onAdd={addTask} />
      <Filter value={filter} onChange={setFilter} />
    </div>

    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <li
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style
                    }}
                  >
                    <TodoList
                      tasks={[task]}
                      onDelete={deleteTask}
                      onToggle={toggleComplete}
                      onSubtaskAdd={addSubtask}
                      onSubtaskToggle={toggleSubtask}
                      onSubtaskDelete={deleteSubtask}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  </div>
);

};

export default TodoApp;
