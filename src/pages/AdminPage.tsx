import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [event, setEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  });

  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.username === username && login.password === password) {
      setAuthenticated(true);
    } else {
      alert('Invalid login');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      ...event,
      id: uuidv4() // Generate unique ID
    };

    const stored = localStorage.getItem('events');
    const events = stored ? JSON.parse(stored) : [];
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));

    alert('Event saved to localStorage!');
    setEvent({
      title: '',
      description: '',
      startTime: '',
      endTime: ''
    });
  };

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="admin-form">
        <h2>Admin Login</h2>
        <input
          placeholder="Username"
          value={login.username}
          onChange={(e) => setLogin({ ...login, username: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Add New Event</h2>
      <input
        placeholder="Title"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        value={event.startTime}
        onChange={(e) => setEvent({ ...event, startTime: e.target.value })}
        required
      />
      <input
        type="datetime-local"
        value={event.endTime}
        onChange={(e) => setEvent({ ...event, endTime: e.target.value })}
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AdminPage;