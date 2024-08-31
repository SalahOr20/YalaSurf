import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';  // Assurez-vous que ce fichier est bien importé

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
    <header id="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
        <div className="container">
          <Link className="navbar-brand" to="/" id="navbar-brand">Accueil</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" id="navbar-toggler">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" id="nav-links">
              <li className="nav-item" id="nav-item-contact">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              {userRole === 'surfer' && (
                <>
                  <li className="nav-item" id="nav-item-surf-clubs">
                    <Link className="nav-link" to="/surf-clubs">Surf Clubs</Link>
                  </li>
                  <li className="nav-item" id="nav-item-previsions">
                    <Link className="nav-link" to="/previsions">Prévisions</Link>
                  </li>
                  <li className="nav-item" id="nav-item-forums">
                    <Link className="nav-link" to="/forums">Forums</Link>
                  </li>
                  <li className="nav-item" id="nav-item-cart">
                    <Link className="nav-link" to="/cart">Panier</Link>
                  </li>
                  <li className="nav-item" id="nav-item-profile">
                    <Link className="nav-link" to="/surfer/profile">Mon Profil</Link>
                  </li>
                </>
              )}
              {userRole === 'surfclub' && (
                <>
                  <li className="nav-item" id="nav-item-dashboard">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item" id="nav-item-club-profile">
                    <Link className="nav-link" to="/surfclub/profile">Mon Profil</Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ml-auto" id="auth-buttons">
              {!userRole ? (
                <li className="nav-item" id="nav-item-login">
                  <Link className="btn btn-primary" to="/login">Login</Link>
                </li>
              ) : (
                <li className="nav-item" id="nav-item-logout">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
