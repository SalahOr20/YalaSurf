import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Forecast = () => {
    const location = useLocation();
    const spot = location.state?.spot;  // Récupérer les données du spot depuis le state
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        if (spot) {
            const fetchForecast = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/surf-spots/prevision/${spot.id}/`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    setForecast(response.data.forecast);  // Utiliser les données de prévision renvoyées par le backend
                } catch (error) {
                    console.error("Failed to fetch forecast", error);
                }
            };

            fetchForecast();
        }
    }, [spot]);

    return (
        <div className="forecast-page">
            <h1>Forecast for {spot ? spot.name : 'Loading...'}</h1>
            {forecast ? (
                <div>
                    <h2>Weather Forecast</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Wave Height (m)</th>
                                <th>Wave Period (s)</th>
                                <th>Wind Speed (m/s)</th>
                                <th>Air Temperature (°C)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecast.hours.map((data, index) => (
                                <tr key={index}>
                                    <td>{new Date(data.time).toLocaleString()}</td> {/* Convertir le timestamp en date lisible */}
                                    <td>{data.waveHeight?.meteo?.toFixed(2) || 'N/A'}</td>
                                    <td>{data.swellPeriod?.meteo?.toFixed(2) || 'N/A'}</td>
                                    <td>{data.windSpeed?.noaa?.toFixed(2) || 'N/A'}</td>
                                    <td>{data.airTemperature?.noaa?.toFixed(2) || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading forecast...</p>
            )}
        </div>
    );
};

export default Forecast;
