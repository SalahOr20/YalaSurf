import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Forecast.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faWater, faThermometerHalf, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const Forecast = () => {
    const location = useLocation();
    const spot = location.state?.spot;
    const [forecast, setForecast] = useState(null);
    const [currentCondition, setCurrentCondition] = useState(null);

    useEffect(() => {
        if (spot) {
            const fetchForecast = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/surf-spots/prevision/${spot.id}/`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    const forecastData = response.data.forecast;
                    setForecast(forecastData);

                    const now = new Date();
                    const currentData = forecastData.hours.find(hour => new Date(hour.time).getTime() >= now.getTime());

                    setCurrentCondition(currentData || forecastData.hours[0]);
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
            {currentCondition && (
                <div className="current-condition">
                    <h2>Current Surf Conditions</h2>
                    <div className="current-condition-grid">
                        <div className="condition-item">
                            <FontAwesomeIcon icon={faWater} className="condition-icon" />
                            <p className="condition-label">Surf:</p>
                            <p className="condition-value">{currentCondition.waveHeight?.meteo?.toFixed(2) || 'N/A'} m</p>
                        </div>
                        <div className="condition-item">
                            <FontAwesomeIcon icon={faTachometerAlt} className="condition-icon" />
                            <p className="condition-label">Rating:</p>
                            <p className="condition-value condition-rating">{currentCondition.rating || 'N/A'}</p>
                        </div>
                        <div className="condition-item">
                            <FontAwesomeIcon icon={faWind} className="condition-icon" />
                            <p className="condition-label">Wind:</p>
                            <p className="condition-value">{currentCondition.windSpeed?.noaa?.toFixed(2) || 'N/A'} m/s</p>
                        </div>
                        <div className="condition-item">
                            <FontAwesomeIcon icon={faThermometerHalf} className="condition-icon" />
                            <p className="condition-label">Weather:</p>
                            <p className="condition-value">{currentCondition.airTemperature?.noaa?.toFixed(2) || 'N/A'} °C</p>
                        </div>
                    </div>
                </div>
            )}
            {forecast ? (
                <div className="forecast-details">
                    <h2>Weather Forecast</h2>
                    <table className="forecast-table">
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
                                    <td><i className="fas fa-clock"></i> {new Date(data.time).toLocaleString()}</td>
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
