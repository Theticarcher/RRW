import React, { useEffect, useState } from 'react';
import '../styling/style.sass'; // Import your SASS file

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const storedEvents = localStorage.getItem('events');

    if (storedEvents) {
      const eventsArray = JSON.parse(storedEvents) as Event[];

      // Filter events to only include those that haven't ended
      const filteredEvents = eventsArray.filter(event => new Date(event.endTime) > now);
      setEvents(filteredEvents);
    }
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div className="event-cards">
          {events.map(event => (
            <div
              key={event.id}
              onClick={() => toggleExpand(event.id)}
              className={`event-card ${expandedId === event.id ? 'expanded' : ''}`}
            >
              <h2>{event.title}</h2>
              <p>
                {new Date(event.startTime).toLocaleString()} –{' '}
                {new Date(event.endTime).toLocaleString()}
              </p>
              {expandedId === event.id && <p>{event.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;