# React To-Do List with Local Authentication

A lightweight React To-Do List app featuring:

- Task add, delete, completion toggle
- Filtering (all, completed, pending)
- Subtasks support
- Dark mode toggle
- Drag-and-drop task sorting
- Local-only user authentication (signup + login stored in `localStorage`)
- Persistent tasks & auth session using `localStorage`
- Plain CSS styling for clean, modern UI

---

## Features

- **Signup & Login:** Users can create accounts and login. User credentials are stored locally (demo only — not secure for production).
- **Task Management:** Add tasks with optional subtasks. Mark tasks and subtasks as complete or delete them.
- **Filtering & Sorting:** Filter tasks by status and reorder tasks with drag-and-drop.
- **Dark Mode:** Toggle between light and dark themes.
- **Local Persistence:** Tasks and user sessions are saved in `localStorage` to persist between sessions.

---

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/react-todo-local-auth.git
   cd Assignment-todo
   npm install
   npm start
   Open http://localhost:3000 in your browser.
   ```
## Usage
Sign up: Create a new account with a username and password.

Login: Use your credentials to access your personal to-do list.

Add tasks: Enter tasks in the form and submit.

Manage tasks: Mark tasks/subtasks complete, delete tasks, reorder via drag-and-drop.
```bash
src/
  components/
    Login.jsx
    Signup.jsx
    TodoApp.jsx
    TodoForm.jsx
    TodoList.jsx
    Filter.jsx
  utils/
    localStorage.js
  styles/
    Login.css
    TodoApp.css
```
## Screenshot
![Alt text](https://github.com/vik802207/Ticket_Booking/blob/main/image/Screenshot%20(332).png?raw=true)

## 🔗 Live Demo
👉 To-do-list Live
## [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://todolistassignmentcelebal.netlify.app/)


## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📞 Contact

For any queries, reach out to me at vikashg802207@gmail.com
## 📜 License

This project is open-source and available under the MIT License.






