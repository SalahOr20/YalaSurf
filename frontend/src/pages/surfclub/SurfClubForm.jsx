import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SurfClubForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [surf_spot, setSurfSpot] = useState('');
  const [logo, setLogo] = useState(null);
  const [surfSpots, setSurfSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/surf-spots/')
      .then(response => setSurfSpots(response.data))
      .catch(error => console.error('Error fetching surf spots:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setLogo(files[0]); // Set file object
    } else {
      switch (name) {
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'confirmPassword':
          setConfirmPassword(value);
          break;
        case 'name':
          setName(value);
          break;
        case 'adress':
          setAdress(value);
          break;
        case 'phone_number':
          setPhoneNumber(value);
          break;
        case 'surf_spot':
          setSurfSpot(value);
          break;
        default:
          break;
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('name', name);
    formData.append('address', adress);
    formData.append('phone_number', phone_number);
    formData.append('surf_spot', surf_spot);
    formData.append('role', "surfclub");
    if (logo) {
      formData.append('logo', logo);
    }
    formData.append('role', 'surfclub');

    try {
      await axios.post('http://127.0.0.1:8000/api/user/register/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      // Handle errors (e.g., show error messages)
    }
  };

  return (
    <div>
      <h1>Surf Club Registration</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Club Name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="adress"
          placeholder="Address"
          value={adress}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone_number"
          placeholder="Phone Number"
          value={phone_number}
          onChange={handleChange}
          required
        />
        <select
          name="surf_spot"
          value={surf_spot}
          onChange={handleChange}
          required
        >
          <option value="">Select Surf Spot</option>
          {surfSpots.map(spot => (
            <option key={spot.id} value={spot.id}>{spot.name}</option>
          ))}
        </select>
        <input
          type="file"
          name="logo"
          onChange={handleChange}
        />
        <button type="submit">Register as Surf Club</button>
      </form>
    </div>
  );
};

export default SurfClubForm;
