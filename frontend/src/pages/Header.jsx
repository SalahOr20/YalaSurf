import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Import icons
import './Header.css';
import logo from '../assets/logo_yalasurf.png';

const Header = ({ userRole, setUserRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State to hold cart count
  const [firstName, setFirstName] = useState(''); // State to hold the first name
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart count from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));

    // Retrieve user first name based on role
    if (userRole === 'surfer') {
      const surfer = JSON.parse(localStorage.getItem('surfer')) || {};
      setFirstName(surfer.firstname || 'Surfer');
    } else if (userRole === 'surfclub') {
      const surfclub = JSON.parse(localStorage.getItem('surfclub')) || {};
      setFirstName(surfclub.name || 'Club');
    }
  }, [userRole]);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header id="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" id="navbar-brand">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              {userRole === 'surfer' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/surf-clubs">Surf Clubs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/previsions">Prévisions</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/forums">Forums</Link>
                  </li>
                </>
              )}
              {userRole === 'surfclub' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="auth-buttons-desktop d-flex align-items-center">
            {userRole && (
              <>
                <Link className="nav-link d-flex align-items-center" to={userRole === 'surfer' ? "/surfer/profile" : "/surfclub/profile"}>
                  <FaUser className="me-2" />
                  {firstName}
                </Link>
                {userRole === 'surfer' && (
                  <Link className="nav-link d-flex align-items-center" to="/cart">
                    <FaShoppingCart className="me-2" />
                    {cartCount > 0 && <span className="badge badge-danger">{cartCount}</span>}
                  </Link>
                )}
              </>
            )}
            {!userRole ? (
              <Link className="btn btn-primary ms-3" to="/login">Login</Link>
            ) : (
              <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
