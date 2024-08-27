import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SurferForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [level, setLevel] = useState('');
  const [adress, setAdress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('surfer');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register/', {
        firstname,
        lastname,
        birthday,
        level,
        adress,
        phone_number,
        email,
        role,
        password
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle errors (e.g., show error messages)
    }
  };

  return (
    <div>
      <h1>Surfer Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Last Name"
          required
        />
          <input
          type="text"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          placeholder="Votre Adresse"
          required
        />
          <input
          type="number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Votre numéro de téléphone"
          required
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Surf Level"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SurferForm;
