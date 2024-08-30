// src/pages/surfer/SurfSpotDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SurfClubList from '../../components/SurfClubList'; // Assurez-vous que ce chemin est correct

const SurfSpotDetails = () => {
    const { id } = useParams();
    const [surfSpot, setSurfSpot] = useState(null);

    useEffect(() => {
        const fetchSurfSpotDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`http://127.0.0.1:8000/api/surf-spots/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSurfSpot(response.data['surf-spot']);
            } catch (error) {
                console.error("Failed to fetch surf spot details", error);
            }
        };

        fetchSurfSpotDetails();
    }, [id]);

    if (!surfSpot) {
        return <p>Loading...</p>;
    }

    return (
        <div className="surf-spot-details-page">
            <h1>{surfSpot.name}</h1>
            <p>{surfSpot.description}</p>
            <p>{surfSpot.address}</p>
            <p>Zip Code: {surfSpot.zip_code}</p>

            {/* Afficher les photos */}
            <div className="surf-spot-photos">
                {surfSpot.photos && surfSpot.photos.length > 0 ? (
                    surfSpot.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={`http://127.0.0.1:8000${photo.image}`}
                            alt={`Surf spot photo ${index + 1}`}
                        />
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </div>

            <h2>Surf Clubs</h2>
            <SurfClubList clubs={surfSpot.surf_clubs} />
        </div>
    );
};

export default SurfSpotDetails;
