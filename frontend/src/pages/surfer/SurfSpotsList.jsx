// src/pages/surfer/SpotsList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SpotsList = () => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const fetchSpots = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/api/surf-spots/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSpots(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch spots", error);
            }
        };

        fetchSpots();
    }, []);

    return (
        <div className="spots-list">
            <h1>Spots</h1>
            <ul>
                {spots.map((spot) => (
                    <li key={spot.id}>
                        <Link 
                            to={`/forecast/${spot.id}`}
                            state={{ spot }} // Pass spot data to the Forecast page
                        >
                            {spot.photos.length > 0 && spot.photos[0] ? (
                                <img src={`http://127.0.0.1:8000${spot.photos[0].image}`} alt={spot.name} />
                            ) : (
                                <p>No image available</p>
                            )}
                            <p>{spot.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotsList;
