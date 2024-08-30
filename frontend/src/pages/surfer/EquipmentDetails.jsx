import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EquipmentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { equipment, surfClubId } = location.state || {};
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
        navigate(`/surf-clubs/${surfClubId}/equipments`);
    };

    return (
        <div className="equipment-details-page">
            <h1>{equipment.name}</h1>
            <img src={`http://127.0.0.1:8000${equipment.photo}`} alt={equipment.name} />
            <p>Description: {equipment.description}</p>
            <p>Taille: {equipment.size}</p>
            <p>État: {equipment.state}</p>
            <p>Prix: {equipment.price} €</p>
            <div>
                <label>Quantité:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    min="1"
                />
            </div>
            <button onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
    );
};

export default EquipmentDetails;
