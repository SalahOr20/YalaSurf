import React from 'react';
import { Link } from 'react-router-dom';
import './SurfClubCard.css'; // Ensure this CSS is linked

const SurfClubCard = ({ club }) => {
    return (
        <div className="surf-club-card">
            <Link to={`/surf-clubs/${club.id}`} state={{ club }}>
                <img src={`http://127.0.0.1:8000${club.logo}`} alt={club.name} />
                <h3>{club.name}</h3>
            </Link>
        </div>
    );
};

export default SurfClubCard;
