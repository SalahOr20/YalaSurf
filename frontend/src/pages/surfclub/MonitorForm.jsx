import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MonitorForm.css';  // Assurez-vous d'importer le fichier CSS
import monitorFormImage from '../../assets/MonitorForm.jpg';  // Importez l'image

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
<div className="monitor-form-container">
    <div className="monitor-form-left">
        <img src={monitorFormImage} alt="Illustration" />
    </div>
    <div className="monitor-form-right">
        <h2>{isEditing ? 'Edit Monitor' : 'Add Monitor'}</h2>
        <form onSubmit={handleSubmit} className="monitor-form">
            <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={monitor.first_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={monitor.last_name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={monitor.birthday}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group checkbox-container">
                <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={monitor.active}
                    onChange={handleChange}
                />
                <label htmlFor="active">Active</label>
            </div>
            {isEditing && monitor.photo && (
                <div className="form-group">
                    <img src={`http://127.0.0.1:8000${monitor.photo}`} alt="Monitor" className="preview-image" />
                </div>
            )}
            <div className="form-group">
                <label htmlFor="photo">Upload Photo</label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="submit-button">
                {isEditing ? 'Update Monitor' : 'Add Monitor'}
            </button>
        </form>
    </div>
</div>

  );
};

export default MonitorForm;
