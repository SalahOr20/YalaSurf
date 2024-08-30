import React from 'react';
import { Link } from 'react-router-dom';

const SurfSpotCard = ({ surfSpot }) => {
    // Choisir la première photo si elle est disponible
    const photoUrl = surfSpot.photos && surfSpot.photos.length > 0
        ? `http://127.0.0.1:8000${surfSpot.photos[0].image}`
        : '/path/to/default-image.jpg'; // Remplacez par le chemin de votre image par défaut

    return (
        <div className="surf-spot-card">
            <Link to={`/surf-spots/${surfSpot.id}`}>
                <img src={photoUrl} alt={surfSpot.name} />
                <h2>{surfSpot.name}</h2>
            </Link>
        </div>
    );
};

export default SurfSpotCard;
