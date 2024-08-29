import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Equipments = () => {
  const [equipments, setEquipments] = useState([]);

  // Fonction pour récupérer le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const token = getAuthToken();
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        const response = await axios.get('http://127.0.0.1:8000/api/surf-club/equipments/', { headers });
        setEquipments(response.data.equipments);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this equipment?");
    if (confirmed) {
      try {
        const token = getAuthToken();
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        await axios.delete(`http://127.0.0.1:8000/api/surf-club/equipment/${id}/`, { headers });
        setEquipments(equipments.filter(equipment => equipment.id !== id));
      } catch (error) {
        console.error('Error deleting equipment:', error);
      }
    }
  };

  return (
    <div>
      <h1>Equipments</h1>
      <Link to="/dashboard/equipment/create" className="add-link">Add New Equipment</Link>
      <ul>
        {equipments.map(equipment => (
          <li key={equipment.id}>
            <p><strong>Name:</strong> {equipment.name}</p>
            <p><strong>Description:</strong> {equipment.description}</p>
            <p><strong>Size:</strong> {equipment.size}</p>
            <p><strong>State:</strong> {equipment.state}</p>
            <p><strong>Material Type:</strong> {equipment.material_type}</p>
            <p><strong>Sale Price:</strong> {equipment.sale_price}</p>
            <p><strong>Rent Price:</strong> {equipment.rent_price}</p>
            <div>
              <Link to={`/dashboard/equipment/${equipment.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(equipment.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Equipments;
