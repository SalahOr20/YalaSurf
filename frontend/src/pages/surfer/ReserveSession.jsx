import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ReserveSession = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook pour la navigation
    const [sessions, setSessions] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchReserveSessionDetails = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`http://127.0.0.1:8000/api/surf-clubs/${id}/lessons/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSessions(response.data.SurfSession);
                setEquipments(response.data.Equipments);
            } catch (error) {
                console.error("Failed to fetch reserve session details", error);
            }
        };

        fetchReserveSessionDetails();
    }, [id]);

    const handleSessionSelect = (session) => {
        setSelectedSession(session);
    };

    const handleEquipmentSelect = (equipment) => {
        setSelectedEquipment(prev =>
            prev.includes(equipment)
            ? prev.filter(item => item !== equipment)
            : [...prev, equipment]
        );
    };

    const handleSubmit = async () => {
        if (!selectedSession) {
            setErrorMessage("Vous devez sélectionner une session de surf.");
            return;
        }
        if (selectedEquipment.length === 0) {
            setErrorMessage("Vous devez sélectionner au moins un matériel.");
            return;
        }

        const token = localStorage.getItem('accessToken');
        try {
            await axios.post(
                'http://127.0.0.1:8000/api/surfers/book_surf_lesson/',
                {
                    surf_session_id: selectedSession.id,
                    equipment_ids: selectedEquipment.map(eq => eq.id),
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            alert('Réservation confirmée!');
            navigate('/'); // Redirige vers la page d'accueil après confirmation
        } catch (error) {
            console.error("Failed to book surf lesson", error);
            setErrorMessage("Erreur lors de la réservation. Veuillez réessayer.");
        }
    };

    return (
        <div className="reserve-session-page">
            <h1>Réserver une session</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <div className="sessions-section">
                <h2>Sélectionner une session</h2>
                <ul>
                    {sessions.map((session) => (
                        <li key={session.id}>
                            <button onClick={() => handleSessionSelect(session)}>
                                {session.lesson_schedule.day_of_week} - {session.lesson_schedule.start_time} à {session.lesson_schedule.end_time}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedSession && (
                <div className="session-details">
                    <h2>Détails de la session</h2>
                    <p>Date: {selectedSession.lesson_schedule.day_of_week}</p>
                    <p>Horaire: {selectedSession.lesson_schedule.start_time} - {selectedSession.lesson_schedule.end_time}</p>
                    <div className="monitor-info">
                        <h3>Moniteur</h3>
                        <p>Nom: {selectedSession.monitor.first_name} {selectedSession.monitor.last_name}</p>
                        <img
                            src={`http://127.0.0.1:8000${selectedSession.monitor.photo}`}
                            alt={`${selectedSession.monitor.first_name} ${selectedSession.monitor.last_name}`}
                        />
                    </div>
                </div>
            )}

            {selectedSession && (
                <div className="equipments-section">
                    <h2>Sélectionner le matériel</h2>
                    <ul>
                        {equipments.map((equipment) => (
                            <li key={equipment.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleEquipmentSelect(equipment)}
                                    />
                                    {equipment.name} - {equipment.description}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedSession && (
                <div className="reservation-summary">
                    <h2>Résumé de la réservation</h2>
                    <p>Session: {selectedSession.lesson_schedule.day_of_week} - {selectedSession.lesson_schedule.start_time} à {selectedSession.lesson_schedule.end_time}</p>
                    <p>Matériel choisi:</p>
                    <ul>
                        {selectedEquipment.map((equipment) => (
                            <li key={equipment.id}>{equipment.name}</li>
                        ))}
                    </ul>
                    <button onClick={handleSubmit}>Confirmer la réservation</button>
                </div>
            )}
        </div>
    );
};

export default ReserveSession;
