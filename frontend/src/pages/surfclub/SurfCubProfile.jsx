import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SurfClubProfile.css'; // Import the CSS file for styling

const SurfClubProfile = () => {
    const [profile, setProfile] = useState(null);
    const [surfSpot, setSurfSpot] = useState(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/surf-club/profile/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const profileData = response.data;
                setProfile(profileData);

                if (profileData['surf-club'].surf_spot) {
                    const surfSpotResponse = await axios.get(`http://127.0.0.1:8000/api/surf-spots/${profileData['surf-club'].surf_spot}/`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setSurfSpot(surfSpotResponse.data['surf-spot']);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };

        fetchProfile();
    }, [token]);

    if (!profile || !surfSpot) return <p>Loading...</p>;

    return (
        <div className="surfclub-profile">
            <div className="profile-header">
                <h1>Surf Club Profile</h1>
                <Link to="/surfclub/edit">
                    <button className="edit-button">Edit Profile</button>
                </Link>
            </div>
            <div className="profile-container">
    <div className="club-info card">
        <div className="logo-container">
            <img
                src={`http://127.0.0.1:8000${profile['surf-club'].logo}`}
                alt="Club Logo"
                className="club-logo"
            />
        </div>
        <div className="club-details">
            <p><strong>Name:</strong> {profile['surf-club'].name}</p>
            <p><strong>Description:</strong> {profile['surf-club'].description}</p>
            <p><strong>Surf Spot:</strong> {surfSpot.name}</p>
        </div>
    </div>
    <div className="user-info card">
        <h2>User Information</h2>
        <p><i className="fas fa-envelope"></i> <strong>Email:</strong> {profile.user.email}</p>
        <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> {profile.user.address}</p>
        <p><i className="fas fa-phone-alt"></i> <strong>Phone Number:</strong> {profile.user.phone_number}</p>
    </div>
</div>

        </div>
    );
};

export default SurfClubProfile;
