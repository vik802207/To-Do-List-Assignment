import React, { useState, useEffect } from 'react';
import './Login.css'; // Reuse same CSS styles

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-body' : 'light-body';
  }, [darkMode]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      return alert('Username and password cannot be empty');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.username === username);
    if (userExists) {
      return alert('Username already taken');
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! Please login.');
    onSignup(); // Show login screen
  };

  return (
    <>
      <div className="toggle-wrapper">
        <label className="toggle-label">
          <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
          <span>🌙 Dark Mode</span>
        </label>
      </div>

      <form className={`glass-form ${darkMode ? 'dark' : ''}`} onSubmit={handleSignup}>
        <h2 className="glass-title">Create Account</h2>

        <div className="input-group">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <button className="glass-button" type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
