import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LessonSchedules = () => {
  const [lessonSchedules, setLessonSchedules] = useState([]);

  // Fonction pour récupérer le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(() => {
    const fetchLessonSchedules = async () => {
      try {
        const token = getAuthToken();
        const headers = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        };
        const response = await axios.get('http://127.0.0.1:8000/api/surf-club/lesson-schedules/', { headers });
        setLessonSchedules(response.data.LessonSchedules);
        console.log(lessonSchedules)
      } catch (error) {
        console.error('Error fetching lesson schedules:', error);
      }
    };

    fetchLessonSchedules();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this schedule?')) {
      return;
    }
    try {
      const token = getAuthToken();
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      await axios.delete(`http://127.0.0.1:8000/api/surf-club/lesson-schedule/${id}/`, { headers });
      setLessonSchedules(lessonSchedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error('Error deleting lesson schedule:', error);
    }
  };

  return (
    <div>
      <h1>Lesson Schedules</h1>
      <Link to="/dashboard/lesson-schedule/create" className="add-link">Add New Schedule</Link>
      <ul>
        {lessonSchedules.map(schedule => (
          <li key={schedule.id}>
            <p><strong>Day:</strong> {schedule.day_of_week}</p>
            <p><strong>Start Time:</strong> {schedule.start_time}</p>
            <p><strong>End Time:</strong> {schedule.end_time}</p>
            <div>
              <Link to={`/dashboard/lesson-schedule/${schedule.id}/edit`}>Edit</Link>
              <button onClick={() => handleDelete(schedule.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonSchedules;
