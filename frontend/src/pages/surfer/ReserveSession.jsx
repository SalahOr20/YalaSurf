import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaCheckCircle, FaShoppingCart, FaExclamationCircle } from 'react-icons/fa'; 
import './ReserveSession.css'; 

const ReserveSession = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [sessions, setSessions] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState([]);
    const [equipmentQuantities, setEquipmentQuantities] = useState({});
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
        setSelectedEquipment(prev => {
            const isSelected = prev.includes(equipment);

            if (isSelected) {
                // Si déjà sélectionné, retirer de la sélection
                const updatedEquipment = prev.filter(item => item !== equipment);
                const { [equipment.id]: removed, ...rest } = equipmentQuantities;
                setEquipmentQuantities(rest);
                return updatedEquipment;
            } else {
                if (equipment.quantity > 0) {
                    // Si la quantité est disponible, ajouter à la sélection
                    setEquipmentQuantities(prevQuantities => ({
                        ...prevQuantities,
                        [equipment.id]: 1, // Initialise avec 1 par défaut
                    }));
                    return [...prev, equipment];
                } else {
                    alert(`Le matériel ${equipment.name} n'est plus disponible.`);
                    return prev;
                }
            }
        });
    };

    const handleQuantityChange = (equipmentId, value) => {
        if (value <= 0) return;
        setEquipmentQuantities(prevQuantities => ({
            ...prevQuantities,
            [equipmentId]: value,
        }));
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
                    equipment_quantities: equipmentQuantities,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            alert('Réservation confirmée!');
            navigate('/'); 
        } catch (error) {
            console.error("Failed to book surf lesson", error);
            setErrorMessage("Erreur lors de la réservation. Veuillez réessayer.");
        }
    };

    return (
        <div className="reserve-session-page">
            <h1 className="reserve-session-title"><FaCalendarAlt /> Réserver une session</h1>
            {errorMessage && <p className="reserve-session-error"><FaExclamationCircle /> {errorMessage}</p>}
            
            <div className="reserve-session-list">
                <h2 className="reserve-session-subtitle"><FaClock /> Sélectionner une session</h2>
                <ul>
                    {sessions.map((session) => (
                        <li key={session.id}>
                            <button className={`session-btn ${selectedSession === session ? 'selected' : ''}`} onClick={() => handleSessionSelect(session)}>
                                {new Date(session.lesson_schedule.day).toLocaleDateString()} - {session.lesson_schedule.start_time} à {session.lesson_schedule.end_time}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedSession && (
                <div className="reserve-session-details">
                    <h2 className="reserve-session-subtitle"><FaUser /> Détails de la session</h2>
                    <div className="session-details-grid">
                        <div className='Infos'>
                        <div className="session-details-item">
                            <p><FaCalendarAlt /> Date: {new Date(selectedSession.lesson_schedule.day).toLocaleDateString()}</p>
                        </div>
                        <div className="session-details-item">
                            <p><FaClock /> Horaire: {selectedSession.lesson_schedule.start_time} - {selectedSession.lesson_schedule.end_time}</p>
                        </div>
                        </div>
                        <div className='Monitor'>
                        <div className="session-details-item monitor-info">
                            <h3 className="reserve-monitor-info-title">Moniteur</h3>
                            <img
                                src={`http://127.0.0.1:8000${selectedSession.monitor.photo}`}
                                alt={`${selectedSession.monitor.first_name} ${selectedSession.monitor.last_name}`}
                                className="monitor-photo"
                            />
                            <strong><p>{selectedSession.monitor.first_name} {selectedSession.monitor.last_name}</p></strong>
                        </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedSession && (
                <div className="reserve-equipments-section">
                    <h2 className="reserve-session-subtitle"><FaShoppingCart /> Sélectionner le matériel</h2>
                    <ul className="reserve-equipments-list">
                        {equipments.map((equipment) => (
                            <li key={equipment.id} className={`equipment-card ${selectedEquipment.includes(equipment) ? 'selected' : ''}`}>
                                <div 
                                    className="equipment-photo" 
                                    style={{ backgroundImage: `url(http://127.0.0.1:8000${equipment.photos[0]?.image})` }}
                                    onClick={() => handleEquipmentSelect(equipment)}
                                >
                                    <div className="equipment-overlay">
                                        <strong>{equipment.name}</strong><br />
                                        <strong>{equipment.rent_price}€</strong><br />
                                        <strong>Quantité disponible: {equipment.quantity}</strong>
                                    </div>
                                </div>
                                {selectedEquipment.includes(equipment) && (
                                    <div className="quantity-selector">
                                        <label>Quantité:</label>
                                        <input
                                            type="number"
                                            value={equipmentQuantities[equipment.id]}
                                            min="1"
                                            max={equipment.quantity}
                                            onChange={(e) => handleQuantityChange(equipment.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedSession && (
                <div className="reserve-summary">
                    <h2 className="reserve-session-subtitle"><FaCheckCircle /> Résumé de la réservation</h2>
                    <p><FaCalendarAlt /> Session: {new Date(selectedSession.lesson_schedule.day).toLocaleDateString()} - {selectedSession.lesson_schedule.start_time} à {selectedSession.lesson_schedule.end_time}</p>
                    <p>Matériel choisi:</p>
                    <ul>
                        {selectedEquipment.map((equipment) => (
                            <li key={equipment.id}>{equipment.name} - Quantité: {equipmentQuantities[equipment.id]}</li>
                        ))}
                    </ul>
                    <button className="reserve-submit-btn" onClick={handleSubmit}>Confirmer la réservation</button>
                </div>
            )}
        </div>
    );
};

export default ReserveSession;
