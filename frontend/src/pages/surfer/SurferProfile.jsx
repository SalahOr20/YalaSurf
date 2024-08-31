import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SurferProfile = () => {
    const [profile, setProfile] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/surfer/profile/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProfile(response.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };

        fetchProfile();
    }, [token]);

    useEffect(() => {
        if (selectedOrder) {
            const fetchOrderDetails = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/surfers/order/${selectedOrder}/`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setOrderDetails(response.data);
                } catch (error) {
                    console.error("Failed to fetch order details", error);
                }
            };

            fetchOrderDetails();
        }
    }, [selectedOrder, token]);

    if (!profile) return <p>Loading...</p>;

    return (
        <div className="surfer-profile">
            <h1>Surfer Profile</h1>
            <div>
                <h2>User Information</h2>
                <p>Email: {profile.user.email}</p>
                <p>Address: {profile.user.address}</p>
                <p>Phone Number: {profile.user.phone_number}</p>
            </div>
            <div>
                <h2>Surfer Details</h2>
                <p>First Name: {profile.surfer.firstname}</p>
                <p>Last Name: {profile.surfer.lastname}</p>
                <p>Birthday: {profile.surfer.birthday}</p>
                <p>Level: {profile.surfer.level}</p>
                {profile.surfer.photo && (
                    <div>
                        <h3>Profile Photo</h3>
                        <img
                            src={profile.surfer.photo}
                            alt={`${profile.surfer.firstname} ${profile.surfer.lastname}`}
                            style={{ width: '150px', height: 'auto' }}
                        />
                    </div>
                )}
            </div>
            <div>
                <h2>Past Sessions</h2>
                {profile.past_sessions.length > 0 ? (
                    profile.past_sessions.map(session => (
                        <div key={session.id}>
                            <p>Monitor: {session.monitor_first_name} {session.monitor_last_name}</p>
                            <p>Day: {session.day}</p>
                            <img src={session.monitor_photo} alt={`${session.monitor_first_name} ${session.monitor_last_name}`} />
                        </div>
                    ))
                ) : (
                    <p>No past sessions.</p>
                )}
            </div>
            <div>
                <h2>Upcoming Sessions</h2>
                {profile.upcoming_sessions.length > 0 ? (
                    profile.upcoming_sessions.map(session => (
                        <div key={session.id}>
                            <p>Monitor: {session.monitor_first_name} {session.monitor_last_name}</p>
                            <p>Day: {session.day}</p>
                            <img src={session.monitor_photo} alt={`${session.monitor_first_name} ${session.monitor_last_name}`} />
                        </div>
                    ))
                ) : (
                    <p>No upcoming sessions.</p>
                )}
            </div>
            <div>
                <h2>Orders</h2>
                {profile.orders.length > 0 ? (
                    profile.orders.map(order => (
                        <div key={order.id}>
                            <p>Order Date: {order.order_date}</p>
                            <p>Surf Club: {order.surf_club_name}</p>
                            <p>Total Price: {order.total_price}</p>
                            <button onClick={() => setSelectedOrder(order.id)}>View Details</button>
                        </div>
                    ))
                ) : (
                    <p>No orders.</p>
                )}
            </div>
            {orderDetails && (
                <div className="order-details">
                    <h2>Order Details</h2>
                    <p>Order Date: {orderDetails.order.order_date}</p>
                    <p>Surf Club: {orderDetails.order.surf_club_name}</p>
                    <p>Total Price: {orderDetails.order.total_price}</p>
                    <h3>Items</h3>
                    {orderDetails.items.length > 0 ? (
                        orderDetails.items.map(item => (
                            <div key={item.id}>
                                <img src={item.photo} alt={item.name} />
                                <p>Name: {item.equipment.name}</p>
                                <p>Description: {item.equipment.description}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Sale Price: {item.equipment.sale_price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No items.</p>
                    )}
                </div>
            )}
            <Link to="/surfer/edit">
                <button>Edit Profile</button>
            </Link>
        </div>
    );
};

export default SurferProfile;
