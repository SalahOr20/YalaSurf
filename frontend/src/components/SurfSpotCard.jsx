import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../assets/bouznika.jpg'; // Ensure this image is in the correct path

const SurfSpotCard = ({ surfSpot }) => {
    const photoUrl = surfSpot.photos && surfSpot.photos.length > 0
        ? `http://127.0.0.1:8000${surfSpot.photos[0].image}`
        : defaultImage;

    return (
        <div className="surf-spot-card">
            <Link to={`/surf-spots/${surfSpot.id}`}>
                <div className="surf-spot-image-wrapper">
                    <img src={photoUrl} alt={surfSpot.name} className="surf-spot-image"/>
                </div>
                <div className="surf-spot-info">
                    <h2 className="surf-spot-name">{surfSpot.name}</h2>
                </div>
            </Link>
        </div>
    );
};

export default SurfSpotCard;
