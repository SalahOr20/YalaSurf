import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SurfLessons.css'; // Importez le fichier CSS pour styliser les composants

const SurfLessons = () => {
  const [surfLessons, setSurfLessons] = useState([]);

  useEffect(() => {
    const fetchSurfLessons = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://127.0.0.1:8000/api/surf-club/surf-lessons/', { headers });
        setSurfLessons(response.data.SurfLessons);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching surf lessons:', error);
      }
    };

    fetchSurfLessons();
  }, []);

  return (
    <div className="surf-lessons-container">
      <h1 className="title">Surf Lessons</h1>
      <ul className="surf-lessons-list">
        {surfLessons.map(lesson => (
          <li key={lesson.id} className="surf-lesson-item">
            <Link to={`/dashboard/surf-lesson/${lesson.id}`} className="surf-lesson-link">
              <div className="surf-lesson-content">
                <img 
                  src={`http://127.0.0.1:8000${lesson.surfer.photo}`} 
                  alt={`${lesson.surfer.firstname} ${lesson.surfer.lastname}`} 
                  className="surfer-photo"
                />
                <div className="surf-lesson-info">
                  <p className="surfer-name">{lesson.surfer.firstname} {lesson.surfer.lastname}</p>
                  <p className="lesson-detail">Level: {lesson.surfer.level}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurfLessons;
