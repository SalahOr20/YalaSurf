import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Monitors = () => {
  const [monitors, setMonitors] = useState([]);

  // Fonction pour récupérer le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const token = getAuthToken();
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        const response = await axios.get('http://127.0.0.1:8000/api/surf-club/monitors/', { headers });
        setMonitors(response.data.monitors);
      } catch (error) {
        console.error('Error fetching monitors:', error);
      }
    };

    fetchMonitors();
  }, []);

  // Fonction pour supprimer un moniteur avec confirmation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this monitor?')) {
      try {
        const token = getAuthToken();
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        await axios.delete(`http://127.0.0.1:8000/api/surf-club/monitor/${id}/`, { headers });
        // Recharger la liste des moniteurs après suppression
        setMonitors(prev => prev.filter(monitor => monitor.id !== id));
      } catch (error) {
        console.error('Error deleting monitor:', error);
      }
    }
  };

  return (
    <div className="monitors-container">
      <h1>Monitors</h1>
      <Link to="/dashboard/monitor/create" className="add-link">Add New Monitor</Link>
      <ul className="monitors-list">
        {monitors.map(monitor => (
          <li key={monitor.id} className="monitor-item">
            <div className="monitor-info">
              <p><strong>First name:</strong> {monitor.first_name}</p>
              <p><strong>Last name:</strong> {monitor.last_name}</p>
              <p><strong>Birthday:</strong> {monitor.birthday}</p>
              <p><strong>Status:</strong> {monitor.active ? 'Active' : 'Inactive'}</p>
            </div>
            <div className="monitor-actions">
              <Link to={`/dashboard/monitor/${monitor.id}/edit`} className="action-link">Edit</Link>
              <button onClick={() => handleDelete(monitor.id)} className="action-link">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Monitors;
