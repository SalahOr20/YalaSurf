import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const LessonScheduleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessonSchedule, setLessonSchedule] = useState({
    surf_club: '',
    start_time: '',
    end_time: '',
    day_of_week: 'Monday',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Fonction pour récupérer le token d'authentification
  const getAuthToken = () => {
    return localStorage.getItem('accessToken');
  };

  useEffect(() => {
    if (id) {
      const fetchLessonSchedule = async () => {
        try {
          const token = getAuthToken();
          const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          };
          const response = await axios.get(`http://127.0.0.1:8000/api/surf-club/lesson-schedule/${id}/`, { headers });
          setLessonSchedule(response.data);
          setIsEditing(true);
        } catch (error) {
          console.error('Error fetching lesson schedule:', error);
          setError('Error fetching lesson schedule');
        }
      };

      fetchLessonSchedule();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonSchedule(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/surf-club/lesson-schedule/${id}/`, lessonSchedule, { headers });
      } else {
        await axios.post('http://127.0.0.1:8000/api/surf-club/add-lesson-schedule/', lessonSchedule, { headers });
      }
      
      navigate('/dashboard/lesson-schedule');
    } catch (error) {
      console.error('Error submitting lesson schedule:', error);
      setError('Error submitting lesson schedule');
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Lesson Schedule' : 'Add Lesson Schedule'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Day of Week:
          <select
            name="day_of_week"
            value={lessonSchedule.day_of_week}
            onChange={handleChange}
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </label>
        <label>
          Start Time:
          <input
            type="time"
            name="start_time"
            value={lessonSchedule.start_time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            name="end_time"
            value={lessonSchedule.end_time}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{isEditing ? 'Update Schedule' : 'Add Schedule'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LessonScheduleForm;
