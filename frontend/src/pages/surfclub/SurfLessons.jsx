import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SurfLessons = () => {
  const [surfLessons, setSurfLessons] = useState([]);

  useEffect(() => {
    const fetchSurfLessons = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://127.0.0.1:8000/api/surf-club/surf-lessons/', { headers });
        setSurfLessons(response.data.SurfLessons);
      } catch (error) {
        console.error('Error fetching surf lessons:', error);
      }
    };

    fetchSurfLessons();
  }, []);

  return (
    <div>
      <h1>Surf Lessons</h1>
      <ul>
        {surfLessons.map(lesson => (
          <li key={lesson.id}>
            <Link to={`/dashboard/surf-lesson/${lesson.id}`}>
              <div>
                <p>Surfer: {lesson.surfer.firstname} {lesson.surfer.lastname}</p>
                <img 
                  src={lesson.surfer.photo} 
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurfLessons;
