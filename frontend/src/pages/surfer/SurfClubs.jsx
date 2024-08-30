import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SurfSpotCard from '../../components/SurfSpotCard';

const SurfClubs = () => {
    const [surfSpots, setSurfSpots] = useState([]);

    useEffect(() => {
        const fetchSurfSpots = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/surf-spots/');
                setSurfSpots(response.data);
                console.log(response.data) // Assurez-vous que c'est le bon format
            } catch (error) {
                console.error("Failed to fetch surf spots", error);
            }
        };

        fetchSurfSpots();
    }, []);

    return (
        <div className="surf-clubs-page">
            <h1>Surf Spots</h1>
            <div className="surf-spot-list">
                {surfSpots.map((spot) => (
                    <SurfSpotCard key={spot.id} surfSpot={spot} />
                ))}
            </div>
        </div>
    );
};

export default SurfClubs;
