import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './pages/Header';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SurferForm from './pages/surfer/SurferForm';
import SurfClubForm from './pages/surfclub/SurfClubForm';
import Profile from './pages/surfer/Profile';
import SurfClubs from './pages/surfer/SurfClubs';
import SurfSpotDetails from './pages/surfer/SurfSpotDetails'; // Import de la page SurfSpotDetails
import Previsions from './pages/surfer/SurfSpotsList.jsx';
import Forum from './pages/surfer/Forum.jsx';
import Dashboard from './pages/surfclub/Dashboard';
import Monitors from './pages/surfclub/Monitors';
import Equipments from './pages/surfclub/Equipments';
import SurfSessions from './pages/surfclub/SurfSessions';
import LessonSchedules from './pages/surfclub/LessonSchedules';
import MonitorForm from './pages/surfclub/MonitorForm';
import SurfLessons from './pages/surfclub/SurfLessons';
import Orders from './pages/surfclub/Orders';
import SurfSessionForm from './pages/surfclub/SurfSessionForm';
import LessonScheduleForm from './pages/surfclub/LessonScheduleForm';
import Contact from './pages/Contact';
import OrderDetail from './pages/surfclub/OrderDetail';
import SurfClubDetails from './pages/surfer/SurfClubDetails';
import Accueil from './pages/Accueil';
import { UserProvider, useUser } from './context/UserContext';
import EquipmentForm from './pages/surfclub/EquipmentForm';
import SurfLessonDetail from './pages/surfclub/SurfLessonDetail';
import ReserveSession from './pages/surfer/ReserveSession';
import EquipmentDetails from './pages/surfer/EquipmentDetails';
import EquipmentList from './pages/surfer/EquipmentList';
import Cart from './pages/surfer/Cart';
import SpotsList from './pages/surfer/SpotsList';
import Forecast from './pages/surfer/Forecast';
import SurfSpotsList from './pages/surfer/SurfSpotsList';
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
            <Route path="/surf-spots/:id" element={<SurfSpotDetails />} />           
            <Route path="/previsions" element={<Previsions />} />
            <Route path="/forums" element={<SpotsList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/surf-spots/:id" element={<SurfSpotDetails />} /> 
            <Route path="/surf-clubs/:id" element={<SurfClubDetails />} />
            <Route path="/reserve-session/:id" element={<ReserveSession />} />
            <Route path="/surf-clubs/:id/equipments" element={<EquipmentList />} />
            <Route path="/equipment/:equipmentId" element={<EquipmentDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/forum/:surf_spot_id" element={<Forum />} />
            <Route path="/surf-spots" element={<SurfSpotsList />} />
            <Route path="/forecast/:spot_id" element={<Forecast />} />

          
          </>
        )}

        {userRole === 'surfclub' && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="monitors" element={<Monitors />} />
            <Route path="monitor/create" element={<MonitorForm />} />
            <Route path="monitor/:id/edit" element={<MonitorForm />} />
            <Route path="equipments" element={<Equipments />} />
            <Route path="equipment/create" element={<EquipmentForm />} />
            <Route path="equipment/:id/edit" element={<EquipmentForm />} />
            <Route path="surf-session" element={<SurfSessions />} />
            <Route path="/dashboard/surf-session/create" element={<SurfSessionForm />} />
            <Route path="/dashboard/surf-session/:id/edit" element={<SurfSessionForm />} />
            <Route path="lesson-schedule" element={<LessonSchedules />} />
            <Route path="/dashboard/lesson-schedule/create" element={<LessonScheduleForm />} />
            <Route path="/dashboard/lesson-schedule/:id/edit" element={<LessonScheduleForm />} />
            <Route path="surf-lesson" element={<SurfLessons />} />
            <Route path="/dashboard/surf-lesson/:id" element={<SurfLessonDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="/dashboard/orders/:id" element={<OrderDetail />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
