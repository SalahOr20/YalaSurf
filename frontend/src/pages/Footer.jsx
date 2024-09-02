import React from 'react';
import './Footer.css'; // Assurez-vous de créer ce fichier pour les styles
import logo from '../assets/logo_yalasurf.png'; // Assurez-vous que le chemin du logo est correct
import { useUser } from '../context/UserContext'; // Importez le contexte utilisateur
import { Link } from 'react-router-dom';

const Footer = () => {
  const { userRole } = useUser(); // Obtenez le rôle de l'utilisateur

  // Liens de navigation pour le surfer
  const surferLinks = [
    { name: 'Surf Clubs', path: '/surf-clubs' },
    { name: 'Prévisions', path: '/previsions' },
    { name: 'Forums', path: '/forums' },
    { name: 'Panier', path: '/cart' },
    { name: 'Mon Profil', path: '/surfer/profile' },
  ];

  // Liens de navigation pour le surf club
  const surfClubLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Mon Profil', path: '/surfclub/profile' },
    { name: 'Contact', path: '/contact' },
  ];

  // Sélectionnez les liens en fonction du rôle
  const navigationLinks = userRole === 'surfer' ? surferLinks : surfClubLinks;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <img src={logo} alt="Yala Surf" className="footer-logo" />
          <p>Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet luctus venenatis.</p>
          <div className="footer-socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Navigation</h3>
          <ul>
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section links">
          <h3>Links</h3>
          <ul>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">API Status</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><i className="fas fa-map-marker-alt"></i> 8502 Preston Rd. Inglewood, Maine 98380, USA</p>
          <p><i className="fas fa-envelope"></i> support@yalasurf.co</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
