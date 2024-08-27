import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SurferForm from './pages/surfer/SurferForm';
import SurfClubForm from './pages/surfclub/SurfClubForm';
import Profile from './pages/surfer/Profile';
import SurfClubs from './pages/surfer/SurfClubs';
import Previsions from './pages/surfer/Previsions';
import Spots from './pages/surfer/Spots';
import Forums from './pages/surfer/Forums.jsx';
import Dashboard from './pages/surfclub/Dashboard';
import Contact from './pages/Contact';
import Accueil from './pages/Accueil';
import { UserProvider, useUser } from './context/UserContext';

const App = () => {
  const { userRole, setUserRole } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const role = localStorage.getItem('userRole');
      setUserRole(role); // Mettre à jour le contexte avec le rôle utilisateur
    }
  }, [setUserRole]);

  return (
    <Router>
      <Header userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {userRole === 'surfer' && (
          <>
            <Route path="/surf-clubs" element={<SurfClubs />} />
            <Route path="/spots" element={<Spots />} />
            <Route path="/previsions" element={<Previsions />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        {userRole === 'surfclub' && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
