import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [event, setEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  // Ensure you have these variables set in your .env file (REACT_APP_USERNAME, REACT_APP_PASSWORD)
  const username = process.env.REACT_APP_USERNAME || '';
  const password = process.env.REACT_APP_PASSWORD || '';

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

    // Optional: Validate start and end times
    if (new Date(event.endTime) <= new Date(event.startTime)) {
      alert('End time must be after start time');
      return;
    }

    const newEvent: Event = {
      ...event,
      id: uuidv4(),
    };

    // Safely parse existing events from localStorage
    const stored = localStorage.getItem('events');
    let eventsData: { events: Event[] } = { events: [] };

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Legacy flat array detected — wrap in object
          eventsData = { events: parsed };
        } else if (parsed && Array.isArray(parsed.events)) {
          eventsData = parsed;
        }
      } catch (err) {
        // Parsing failed — reset to default
        eventsData = { events: [] };
      }
    }

    // Add new event and save
    eventsData.events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(eventsData));

    alert('Event saved to localStorage!');

    // Reset form fields
    setEvent({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
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
          required
          autoComplete="username"
        />
        <input
          placeholder="Password"
          type="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          required
          autoComplete="current-password"
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