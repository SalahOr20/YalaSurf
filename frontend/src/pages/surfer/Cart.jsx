import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleRemoveItem = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleOrder = async () => {
        const token = localStorage.getItem('accessToken');
        const surfClubId = cart[0]?.equipment.surf_club;

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/surfers/add-order/',
                {
                    surf_club: surfClubId,
                    items: cart.map(item => ({
                        equipment: item.equipment.id,
                        quantity: item.quantity,
                    })),
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            alert('Commande passée avec succès!');
            localStorage.removeItem('cart');
            navigate('/');
        } catch (error) {
            console.error("Failed to place order", error);
            alert("Erreur lors du passage de la commande. Veuillez réessayer.");
        }
    };

    return (
        <div className="cart-page">
            <h1>Votre Panier</h1>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <img src={`http://127.0.0.1:8000${item.equipment.photo}`} alt={item.equipment.name} />
                                <p>{item.equipment.name}</p>
                                <p>Quantité: {item.quantity}</p>
                                <p>Prix unitaire: {item.equipment.price} €</p>
                                <button onClick={() => handleRemoveItem(index)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleOrder}>Passer la commande</button>
                </>
            )}
        </div>
    );
};

export default Cart;
