import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const EquipmentList = () => {
    const { id } = useParams(); // ID du Surf Club
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/surf-clubs/${id}/equipments/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEquipments(response.data.Equipments);
            } catch (error) {
                console.error("Failed to fetch equipments", error);
            }
        };

        fetchEquipments();
    }, [id]);

    return (
        <div className="equipment-list-page">
            <h1>Équipements à vendre</h1>
            <div className="equipment-grid">
                {equipments.map((equipment) => (
                    <div key={equipment.id} className="equipment-item">
                        <img src={`http://127.0.0.1:8000${equipment.photo}`} alt={equipment.name} />
                        <h3>{equipment.name}</h3>
                        <p>Prix: {equipment.price} €</p>
                        <Link to={`/equipment/${equipment.id}`} state={{ equipment, surfClubId: id }}>
                            Voir les détails
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentList;
