export const loadTasks = () => {
  const stored = localStorage.getItem('todoTasks');
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
};
