import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserRole } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/login/', { email, password });
      
      const user = response.data.user;
      const accessToken = response.data.access;

      let role = null;
      if (user.is_surfer == 1) {
        role = 'surfer';
        localStorage.setItem('surfer', JSON.stringify(response.data.surfer));
      } else if (user.is_surfclub == 1) {
        role = 'surfclub';
        localStorage.setItem('surfclub', JSON.stringify(response.data.surfclub));
      }

      setUserRole(role);
      localStorage.setItem('userRole', role);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user)); 

      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Sign up here</a>
      </p>
    </div>
  );
};

export default Login;
