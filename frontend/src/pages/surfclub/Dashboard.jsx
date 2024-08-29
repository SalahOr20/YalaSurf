import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/dashboard">Accueil</Link></li>
            <li><Link to="/dashboard/monitors">Monitors</Link></li>
            <li><Link to="/dashboard/equipments">Equipements</Link></li>
            <li><Link to="/dashboard/surf-session">Surf Session</Link></li>
            <li><Link to="/dashboard/lesson-schedule">Lesson Schedule</Link></li>
            <li><Link to="/dashboard/surf-lesson">Surf Lesson</Link></li>
            <li><Link to="/dashboard/orders">Orders</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Render the nested routes here */}
      </main>
    </div>
  );
};

export default Dashboard;
