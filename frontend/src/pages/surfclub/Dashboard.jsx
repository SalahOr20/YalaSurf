import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Assurez-vous d'avoir le CSS lié

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Ajoute un état pour la sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Bouton hamburger pour mobile */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/">
                <i className="fas fa-home"></i> Accueil
              </Link>
            </li>
            <li>
              <Link to="/dashboard/statistics">
                <i className="fas fa-home"></i> Statistics
              </Link>
            </li>
            <li>
              <Link to="/dashboard/monitors">
                <i className="fas fa-users"></i> Monitors
              </Link>
            </li>
            <li>
              <Link to="/dashboard/equipments">
                <i className="fas fa-box"></i> Equipements
              </Link>
            </li>
            <li>
              <Link to="/dashboard/surf-session">
                <i className="fas fa-calendar-alt"></i> Surf Session
              </Link>
            </li>
            <li>
              <Link to="/dashboard/lesson-schedule">
                <i className="fas fa-calendar-check"></i> Lesson Schedule
              </Link>
            </li>
            <li>
              <Link to="/dashboard/surf-lesson">
                <i className="fas fa-water"></i> Surf Lesson
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders">
                <i className="fas fa-shopping-cart"></i> Orders
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet /> {/* Render the nested routes here */}
      </main>
    </div>
  );
};

export default Dashboard;
