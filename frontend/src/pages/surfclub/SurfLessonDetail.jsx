import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SurfLessonDetail = () => {
  const [surfLesson, setSurfLesson] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSurfLesson = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`http://127.0.0.1:8000/api/surf-club/surf-lessons/${id}/`, { headers });
        setSurfLesson(response.data.SurfLesson);
        console.log(response.data.SurfLesson);
      } catch (error) {
        console.error('Error fetching surf lesson details:', error);
      }
    };

    fetchSurfLesson();
  }, [id]);

  if (!surfLesson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Surf Lesson Details</h1>
      <div>
        <h2>Surfer</h2>
            <img src={surfLesson.surfer.photo} alt={`${surfLesson.surfer.firstname} ${surfLesson.surfer.lastname}`} />

        <p>Name: {surfLesson.surfer.firstname} {surfLesson.surfer.lastname}</p>
        <p>Birthday: {surfLesson.surfer.birthday}</p>
        <p>Level: {surfLesson.surfer.level}</p>
      </div>
      <div>
        <h2>Surf Session</h2>
        <p>Session ID: {surfLesson.surf_lesson.id}</p>
        <div>
          <h3>Lesson Schedule</h3>
          <p>Day of Week: {surfLesson.LessonSchedule.day_of_week}</p>
          <p>Start Time: {surfLesson.LessonSchedule.start_time}</p>
          <p>End Time: {surfLesson.LessonSchedule.end_time}</p>
        </div>
        <div>
          <h3>Monitor</h3>
                  <img src={surfLesson.monitor.photo} alt={`${surfLesson.monitor.first_name} ${surfLesson.monitor.last_name}`} />

          <p>Name: {surfLesson.monitor.first_name} {surfLesson.monitor.last_name}</p>

        </div>
      </div>
      <div>
        <h2>Equipment</h2>
        <ul>
          {surfLesson.equipment_selection.length > 0 ? (
            surfLesson.equipment_selection.map(equipment => (
              <li key={equipment.id}>
                {equipment.name} - State: {equipment.state} (Quantity: {equipment.quantity})
              </li>
            ))
          ) : (
            <li>No equipment selected.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SurfLessonDetail;
