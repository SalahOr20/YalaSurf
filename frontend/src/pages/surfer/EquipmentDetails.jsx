import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRuler, FaTag, FaEuroSign } from 'react-icons/fa'; // Importing icons
import './EquipmentDetails.css';

const EquipmentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { equipment } = location.state || {};
    const [quantity, setQuantity] = useState(1);

    if (!equipment) {
        return <p>Loading...</p>;
    }

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.equipment.id === equipment.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ equipment, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate(`/surf-clubs/${equipment.surf_club}/equipments`);
    };

    return (
        <div className="equipment-details-page">
            <div className="equipment-image-section">
                <img src={`http://127.0.0.1:8000${equipment.photos[0]?.image}`} alt={equipment.name} className="equipment-image" />
            </div>
            <div className="equipment-info-section">
                <h2 className="equipment-category">BEST EQUIPMENT</h2>
                <h1 className="equipment-title">{equipment.name}</h1>
                <p className="equipment-description">{equipment.description}</p>
                <div className="equipment-details">
                    <p><FaRuler /> <strong>Taille:</strong> {equipment.size}</p>
                    <p><FaTag /> <strong>État:</strong> {equipment.state}</p>
                    <p><FaEuroSign /> <strong>Prix:</strong> {equipment.sale_price} €</p>
                </div>
                <div className="equipment-quantity">
                    <label htmlFor="quantity">Quantité:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                    />
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Ajouter au panier</button>
            </div>
        </div>
    );
};

export default EquipmentDetails;
