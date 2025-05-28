import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, onShowSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-body' : 'light-body';
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('currentUser', username);
      onLogin(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <>
      <div className="toggle-wrapper">
        <label className="toggle-label">
          <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
          <span>🌙 Dark Mode</span>
        </label>
      </div>

      <form className={`glass-form ${darkMode ? 'dark' : ''}`} onSubmit={handleSubmit}>
        <h2 className="glass-title">Welcome Back</h2>

        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <button className="glass-button" type="submit">Login</button>

        <p className="glass-footer">
          Don't have an account?{' '}
          <button type="button" className="glass-link" onClick={onShowSignup}>
            Sign up
          </button>
        </p>
      </form>
    </>
  );
};

export default Login;
