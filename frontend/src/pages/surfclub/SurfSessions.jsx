import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SurfSessions = () => {
  const [surfSessions, setSurfSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSurfSessions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get('http://127.0.0.1:8000/api/surf-club/surf-sessions/', { headers });
      setSurfSessions(response.data.surf_sessions);
    } catch (err) {
      setError('Error fetching surf sessions.');
      console.error('Error fetching surf sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`http://127.0.0.1:8000/api/surf-club/surf-session/${id}/`, { headers });
        // Refresh the list after deletion
        fetchSurfSessions();
      } catch (err) {
        alert('Error deleting surf session.');
        console.error('Error deleting surf session:', err);
      }
    }
  };

  useEffect(() => {
    fetchSurfSessions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Surf Sessions</h1>
      <Link to="/dashboard/surf-session/create">Create New Session</Link>
      {surfSessions.length > 0 ? (
        <ul>
          {surfSessions.map(session => (
            <li key={session.id}>
              <h2>Session ID: {session.id}</h2>
              <div>
                <h3>Lesson Schedule</h3>
                <p>Day of Week: {session.lesson_schedule.day_of_week}</p>
                <p>Start Time: {session.lesson_schedule.start_time}</p>
                <p>End Time: {session.lesson_schedule.end_time}</p>
              </div>
              <div>
                <h3>Monitor</h3>
                <p>Name: {session.monitor.first_name} {session.monitor.last_name}</p>
                <img src={session.monitor.photo} alt={`${session.monitor.first_name} ${session.monitor.last_name}`} />
              </div>
              <Link to={`/dashboard/surf-session/${session.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(session.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No surf sessions available.</p>
      )}
    </div>
  );
};

export default SurfSessions;
