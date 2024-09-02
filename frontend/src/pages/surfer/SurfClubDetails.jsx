import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SurfClubDetails.css';

const SurfClubDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { club } = location.state || {}; // Récupérer les données du club depuis state

    if (!club) {
        return <p className="surfclub-details-loading">Loading...</p>;
    }

    const handleReserveClick = () => {
        navigate(`/reserve-session/${club.id}`);
    };

    return (
        <div className="surfclub-details-page">
            <div className="surfclub-details-header">
                <img src={`http://127.0.0.1:8000${club.logo}`} alt={club.name} className="surfclub-details-logo"/>
                <h1 className="surfclub-details-title">{club.name}</h1>
            </div>
            <div className="surfclub-details-action-cards">
                <div className="surfclub-details-action-card">
                    <h2 className="surfclub-details-action-title">J'achète</h2>
                    <p className="surfclub-details-action-description">Explorez notre équipement disponible pour l'achat.</p>
                    <button className="surfclub-details-action-button" onClick={() => navigate(`/surf-clubs/${club.id}/equipments`)}>Acheter</button>
                </div>
                <div className="surfclub-details-action-card">
                    <h2 className="surfclub-details-action-title">Je réserve une session</h2>
                    <p className="surfclub-details-action-description">Réservez votre prochaine session de surf avec nous.</p>
                    <button className="surfclub-details-action-button" onClick={handleReserveClick}>Réserver</button>
                </div>
            </div>
        </div>
    );
};

export default SurfClubDetails;
