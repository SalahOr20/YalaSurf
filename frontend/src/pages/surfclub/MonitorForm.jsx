import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MonitorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monitor, setMonitor] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    active: false,
    photo: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour récupérer le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(() => {
    if (id) {
      const fetchMonitor = async () => {
        try {
          const token = getAuthToken();
          const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          };
          const response = await axios.get(`http://127.0.0.1:8000/api/surf-club/monitor/${id}/`, { headers });
          setMonitor(response.data);
          setIsEditing(true);
        } catch (error) {
          console.error('Error fetching monitor:', error);
        }
      };

      fetchMonitor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setMonitor(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Ajoute tous les champs à FormData
    for (const key in monitor) {
      formData.append(key, monitor[key] || ''); // Assurez-vous que les champs sont correctement ajoutés
    }

    try {
      const token = getAuthToken();
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      };
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/surf-club/monitor/${id}/`, formData, { headers });
      } else {
        await axios.post('http://127.0.0.1:8000/api/surf-club/add-monitor/', formData, { headers });
      }
      navigate('/dashboard/monitors');
    } catch (error) {
      console.error('Error submitting monitor:', error);
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Monitor' : 'Add Monitor'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={monitor.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={monitor.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="date"
          name="birthday"
          value={monitor.birthday}
          onChange={handleChange}
          placeholder="Birthday"
          required
        />
        <label>
          <input
            type="checkbox"
            name="active"
            checked={monitor.active}
            onChange={handleChange}
          />
          Active
        </label>
        {isEditing && monitor.photo && (
          <div>
            <img src={`http://127.0.0.1:8000${monitor.photo}`} alt="Monitor" style={{ width: '100px' }} />
           
          </div>
        )}
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          placeholder="Upload Photo"
        />
        <button type="submit">{isEditing ? 'Update Monitor' : 'Add Monitor'}</button>
      </form>
    </div>
  );
};

export default MonitorForm;
