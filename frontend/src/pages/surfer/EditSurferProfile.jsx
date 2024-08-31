import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditSurferProfile = () => {
    const [formData, setFormData] = useState({
        user: {},
        surfer: {}
    });
    const [passwordChange, setPasswordChange] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [newPhoto, setNewPhoto] = useState(null); // State pour la nouvelle photo
    const [photoPreview, setPhotoPreview] = useState(''); // Pour afficher la photo actuelle
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/surfer/profile/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setFormData({
                    user: response.data.user,
                    surfer: response.data.surfer
                });

                // Afficher la photo actuelle s'il y en a une
                if (response.data.surfer.photo) {
                    setPhotoPreview(response.data.surfer.photo);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };

        fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name.split('.')[0]]: {
                ...prevData[name.split('.')[0]],
                [name.split('.')[1]]: value
            }
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setNewPhoto(file); // Met à jour la nouvelle photo
        if (file) {
            setPhotoPreview(URL.createObjectURL(file)); // Affiche un aperçu de la nouvelle photo
        }
    };

    const handlePasswordChangeToggle = (e) => {
        setPasswordChange(e.target.checked);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const errors = {};
        if (passwordChange && formData.user.password !== passwordConfirm) {
            errors.passwordConfirm = 'Passwords do not match';
        }
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Prepare data to submit
            const userData = { ...formData.user };
            if (!passwordChange) {
                // Remove password field if password change is not requested
                delete userData.password;
            }

            const dataToSubmit = new FormData();
            dataToSubmit.append('user', JSON.stringify(userData));
            dataToSubmit.append('surfer', JSON.stringify(formData.surfer));

            if (newPhoto) {
                dataToSubmit.append('photo', newPhoto); // Ajoute la nouvelle photo si présente
            }

            try {
                await axios.put('http://127.0.0.1:8000/api/surfer/profile/update/', dataToSubmit, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // Nécessaire pour envoyer un fichier
                    }
                });
                navigate('/surfer/profile');
            } catch (error) {
                console.error("Failed to update profile", error);
            }
        }
    };

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <h2>User Information</h2>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="user.email"
                            value={formData.user.email || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Change Password:
                        <input
                            type="checkbox"
                            checked={passwordChange}
                            onChange={handlePasswordChangeToggle}
                        />
                    </label>
                    {passwordChange && (
                        <>
                            <label>
                                New Password:
                                <input
                                    type="password"
                                    name="user.password"
                                    value={formData.user.password || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Confirm New Password:
                                <input
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={handlePasswordConfirmChange}
                                />
                                {formErrors.passwordConfirm && <p>{formErrors.passwordConfirm}</p>}
                            </label>
                        </>
                    )}
                    <label>
                        Address:
                        <input
                            type="text"
                            name="user.address"
                            value={formData.user.address || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="user.phone_number"
                            value={formData.user.phone_number || ''}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <h2>Surfer Details</h2>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="surfer.firstname"
                            value={formData.surfer.firstname || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="surfer.lastname"
                            value={formData.surfer.lastname || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Birthday:
                        <input
                            type="date"
                            name="surfer.birthday"
                            value={formData.surfer.birthday || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Level:
                        <select
                            name="surfer.level"
                            value={formData.surfer.level || ''}
                            onChange={handleChange}
                        >
                            <option value="">Select level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </label>
                    <label>
                        Profile Photo:
                        <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        {photoPreview && (
                            <div>
                                <img
                                    src={photoPreview}
                                    alt="Profile Preview"
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            </div>
                        )}
                    </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditSurferProfile;
