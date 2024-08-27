import React, { useState } from 'react';
import SurferForm from '../surfer/SurferForm';
import SurfClubForm from '../surfclub/SurfClubForm';

const Register = () => {
  const [role, setRole] = useState('');

  return (
    <div>
      <h2>Register</h2>
      {role ? (
        role === 'surfer' ? (
          <SurferForm />
        ) : (
          <SurfClubForm />
        )
      ) : (
        <div>
          <button onClick={() => setRole('surfer')}>Je suis surfeur</button>
          <button onClick={() => setRole('surfclub')}>Je suis surf club</button>
        </div>
      )}
    </div>
  );
};

export default Register;
