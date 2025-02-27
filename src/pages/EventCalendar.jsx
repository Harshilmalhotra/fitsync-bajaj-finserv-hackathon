import React, { useState, useEffect } from 'react';

const EventCalendar = () => {
  const [events, setEvents] = useState([]); // State to hold events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const API_KEY = "AIzaSyDLZSHycsS8kZPiXHFI34BKGDpXjDSGR5U"; // Replace with your API key
  const CALENDAR_ID = "primary"; // Replace with your calendar ID (e.g., primary or specific calendar ID)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Google Calendar Events</h2>
      {loading && <p className="text-gray-500 text-center">Loading events...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="text-gray-500 text-center">No upcoming events found.</p>
      )}
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-3 border border-gray-300 rounded-lg hover:shadow-md transition duration-150"
          >
            <h3 className="text-lg font-semibold text-blue-600">{event.summary}</h3>
            <p className="text-sm text-gray-600">
              Start: {event.start?.dateTime || event.start?.date}
            </p>
            <p className="text-sm text-gray-600">
              End: {event.end?.dateTime || event.end?.date}
            </p>
            {event.location && <p className="text-gray-500">Location: {event.location}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventCalendar;