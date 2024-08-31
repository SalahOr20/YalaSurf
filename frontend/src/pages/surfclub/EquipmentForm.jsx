import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EquipmentForm.css'; // Import the CSS file for styling

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState({
    name: '',
    description: '',
    size: '',
    state: '',
    material_type: 'rent',
    equipment_type: '',
    surf_club: '',
    sale_price: '',
    rent_price: '',
    is_rent: false,
    is_sell: false,
    photos: []  // Toujours initialiser avec un tableau vide
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [EquipmentTypes, setEquipmentTypes] = useState([]);

  // Fonction pour récupérer le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };

  const fetchEquipmentTypes = async () => {
    try {
      const token = getAuthToken();
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      const response = await axios.get('http://127.0.0.1:8000/api/surf-club/equipment-types/', { headers });
      setEquipmentTypes(response.data.equipment_types);
    } catch (error) {
      console.error('Error fetching equipment types:', error);
      setError('Error fetching equipment types');
    }
  };

  useEffect(() => {
    fetchEquipmentTypes();
    if (id) {
      const fetchEquipment = async () => {
        try {
          const token = getAuthToken();
          const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          };
          const response = await axios.get(`http://127.0.0.1:8000/api/surf-club/equipment/${id}/`, { headers });
          const equipmentData = {
            ...response.data,
            photos: response.data.photos || []  // S'assurer que photos est un tableau
          };
          setEquipment(equipmentData);
          setIsEditing(true);
        } catch (error) {
          console.error('Error fetching equipment:', error);
          setError('Error fetching equipment');
        }
      };
      fetchEquipment();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEquipment(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMaterialTypeChange = (e) => {
    const value = e.target.value;
    setEquipment(prev => ({
      ...prev,
      material_type: value,
      is_rent: value === 'rent',
      is_sell: value === 'sale',
      rent_price: value === 'rent' ? prev.rent_price : '',
      sale_price: value === 'sale' ? prev.sale_price : ''
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEquipment(prev => ({
      ...prev,
      photos: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      const formData = new FormData();
      Object.keys(equipment).forEach(key => {
        if (key !== 'photos' && equipment[key] !== null && equipment[key] !== '') {
          formData.append(key, equipment[key]);
        }
      });
      if (Array.isArray(equipment.photos)) {
        equipment.photos.forEach(photo => {
          formData.append('photos', photo);
        });
      }
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/surf-club/equipment/${id}/`, formData, { headers });
      } else {
        await axios.post('http://127.0.0.1:8000/api/surf-club/add-equipment/', formData, { headers });
      }
      navigate('/dashboard/equipments');
    } catch (error) {
      console.error('Error submitting equipment:', error);
      setError('Error submitting equipment');
    }
  };

  return (
    <div className="equipment-form-container">
      <h1>{isEditing ? 'Edit Equipment' : 'Add Equipment'}</h1>
      <form onSubmit={handleSubmit} className="equipment-form">
        <input
          type="text"
          name="name"
          value={equipment.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="form-input"
        />
        <textarea
          name="description"
          value={equipment.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="form-input"
        />
        <input
          type="text"
          name="size"
          value={equipment.size}
          onChange={handleChange}
          placeholder="Size"
          required
          className="form-input"
        />
        <select
          name="state"
          value={equipment.state}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select State</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="damaged">Damaged</option>
        </select>
        <select
          name="material_type"
          value={equipment.material_type}
          onChange={handleMaterialTypeChange}
          required
          className="form-select"
        >
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        {equipment.material_type === 'sale' && (
          <input
            type="number"
            name="sale_price"
            value={equipment.sale_price || ''}
            onChange={handleChange}
            placeholder="Sale Price"
            className="form-input"
          />
        )}
        {equipment.material_type === 'rent' && (
          <input
            type="number"
            name="rent_price"
            value={equipment.rent_price || ''}
            onChange={handleChange}
            placeholder="Rent Price"
            className="form-input"
          />
        )}
        <select
          name="equipment_type"
          value={equipment.equipment_type}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select Equipment Type</option>
          {EquipmentTypes.map(type => (
            <option key={type.id} value={type.id}>{type.type}</option>
          ))}
        </select>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Equipment' : 'Add Equipment'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default EquipmentForm;
