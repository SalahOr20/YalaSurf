import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('surfer');
    localStorage.removeItem('surfclub');
    localStorage.removeItem('userRole');
    
    setUserRole(null);

    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        
        {!userRole && (
          <li><Link to="/login">Login</Link></li>
        )}
        
        {userRole === 'surfer' && (
          <>
            <li><Link to="/surf-clubs">Surf Clubs</Link></li>
            <li><Link to="/previsions">Prévisions</Link></li>
            <li><Link to="/forums">Forums</Link></li>
            <li><Link to="/cart">Panier</Link></li> {/* Ajouter le bouton Panier ici */}
            <li><Link to="/profile">Mon Profil</Link></li>
          </>
        )}

        {userRole === 'surfclub' && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Mon Profil</Link></li>
          </>
        )}

        {userRole && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
