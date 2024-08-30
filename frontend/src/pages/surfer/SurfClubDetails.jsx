// src/pages/surfer/SurfClubDetails.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SurfClubDetails.css';

const SurfClubDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { club } = location.state || {}; // Récupérer les données du club depuis state

    if (!club) {
        return <p>Loading...</p>;
    }

    const handleReserveClick = () => {
        navigate(`/reserve-session/${club.id}`);
    };

    return (
        <div className="surf-club-details-page">
            <div className="surf-club-header">
                <img src={`http://127.0.0.1:8000${club.logo}`} alt={club.name} />
                <h1>{club.name}</h1>
            </div>
            <div className="action-cards">
                <div className="action-card">
                    <h2>J'achète</h2>
                    <p>Explorez notre équipement disponible pour l'achat.</p>
                    <button onClick={() => navigate(`/surf-clubs/${club.id}/equipments`)}>Acheter</button>
                </div>
                <div className="action-card">
                    <h2>Je réserve une session</h2>
                    <p>Réservez votre prochaine session de surf avec nous.</p>
                    <button onClick={handleReserveClick}>Réserver</button>
                </div>
            </div>
        </div>
    );
};

export default SurfClubDetails;
