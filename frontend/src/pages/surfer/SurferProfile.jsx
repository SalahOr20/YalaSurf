import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SurferProfile.css';
import { FaUser, FaCalendarAlt, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';

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
        <div className="surfer-profile-page">
            <div className="surfer-profile-header">
                <h1>Surfer Profile</h1>
                <Link to="/surfer/edit" className="surfer-edit-button">
                    Edit Profile
                </Link>
            </div>

            <div className="surfer-profile-container">
                <div className="surfer-card">
                    <h2>User Information</h2>
                    <p><FaEnvelope /> <strong>Email:</strong> {profile.user.email}</p>
                    <p><FaMapMarkerAlt /> <strong>Address:</strong> {profile.user.address}</p>
                    <p><FaPhoneAlt /> <strong>Phone Number:</strong> {profile.user.phone_number}</p>
                </div>

                <div className="surfer-card">
                    <h2>Surfer Details</h2>
                    <p><strong>First Name:</strong> {profile.surfer.firstname}</p>
                    <p><strong>Last Name:</strong> {profile.surfer.lastname}</p>
                    <p><strong>Birthday:</strong> {profile.surfer.birthday}</p>
                    <p><strong>Level:</strong> {profile.surfer.level}</p>
                    {profile.surfer.photo && (
                        <div>
                            <h3>Profile Photo</h3>
                            <img
                                src={profile.surfer.photo}
                                alt={`${profile.surfer.firstname} ${profile.surfer.lastname}`}
                                className="surfer-profile-photo"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="surfer-profile-container">
                <div className="surfer-card">
                    <h2>Past Sessions</h2>
                    {profile.past_sessions.length > 0 ? (
                        profile.past_sessions.map(session => (
                            <div key={session.id} className="surfer-session">
                                <p><FaUser /> <strong>Monitor:</strong> {session.monitor_first_name} {session.monitor_last_name}</p>
                                <p><FaCalendarAlt /> <strong>Day:</strong> {session.day}</p>
                                <img src={session.monitor_photo} alt={`${session.monitor_first_name} ${session.monitor_last_name}`} className="surfer-session-photo" />
                                <hr className="session-separator" />
                            </div>
                        ))
                    ) : (
                        <p>No past sessions.</p>
                    )}
                </div>

                <div className="surfer-card">
                    <h2>Upcoming Sessions</h2>
                    {profile.upcoming_sessions.length > 0 ? (
                        profile.upcoming_sessions.map(session => (
                            <div key={session.id} className="surfer-session">
                                <p><FaUser /> <strong>Monitor:</strong> {session.monitor_first_name} {session.monitor_last_name}</p>
                                <p><FaCalendarAlt /> <strong>Day:</strong> {session.day}</p>
                                <img src={session.monitor_photo} alt={`${session.monitor_first_name} ${session.monitor_last_name}`} className="surfer-session-photo" />
                                <hr className="session-separator" />
                            </div>
                        ))
                    ) : (
                        <p>No upcoming sessions.</p>
                    )}
                </div>
            </div>

            <div className="surfer-profile-container">
                <div className="surfer-card">
                    <h2>Orders</h2>
                    {profile.orders.length > 0 ? (
                        profile.orders.map(order => (
                            <div key={order.id} className="surfer-order">
                                <p><FaCalendarAlt /> <strong>Order Date:</strong> {order.order_date}</p>
                                <p><FaShoppingCart /> <strong>Surf Club:</strong> {order.surf_club_name}</p>
                                <p><strong>Total Price:</strong> {order.total_price}</p>
                                <button onClick={() => setSelectedOrder(order.id)} className="details-button">View Details</button>
                                <hr className="order-separator" />
                            </div>
                        ))
                    ) : (
                        <p>No orders.</p>
                    )}
                </div>
            </div>

            {orderDetails && (
                <div className="surfer-card surfer-order-details">
                    <h2>Order Details</h2>
                    <p><strong>Order Date:</strong> {orderDetails.order.order_date}</p>
                    <p><strong>Surf Club:</strong> {orderDetails.order.surf_club_name}</p>
                    <p><strong>Total Price:</strong> {orderDetails.order.total_price}</p>
                    <h3>Items</h3>
                    {orderDetails.items.length > 0 ? (
                        orderDetails.items.map(item => (
                            <div key={item.id} className="order-item">
                                <img src={item.photo} alt={item.name} className="order-item-photo" />
                                <p><strong>Name:</strong> {item.equipment.name}</p>
                                <p><strong>Description:</strong> {item.equipment.description}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Sale Price:</strong> {item.equipment.sale_price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No items.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SurferProfile;
