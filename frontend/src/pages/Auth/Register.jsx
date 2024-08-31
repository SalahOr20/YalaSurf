import React, { useState } from 'react';
import SurferForm from '../surfer/SurferForm';
import SurfClubForm from '../surfclub/SurfClubForm';
import './Register.css';

const Register = () => {
  const [role, setRole] = useState('');

  return (
    <div id="register-container">
      {!role && (
        <div className="row" id="role-selection">
          <div className="col-md-6">
            <div className="card register-card">
              <img
                src="https://via.placeholder.com/400x200"
                className="card-img-top register-card-img-top"
                alt="Surfer"
              />
              <div className="card-body text-center">
                <h5 className="card-title register-card-title">Je suis surfeur</h5>
                <button
                  className="btn btn-primary register-btn-select"
                  onClick={() => setRole('surfer')}
                >
                  Sélectionner
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card register-card">
              <img
                src="https://via.placeholder.com/400x200"
                className="card-img-top register-card-img-top"
                alt="Surf Club"
              />
              <div className="card-body text-center">
                <h5 className="card-title register-card-title">Je suis surf club</h5>
                <button
                  className="btn btn-primary register-btn-select"
                  onClick={() => setRole('surfclub')}
                >
                  Sélectionner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {role === 'surfer' && <SurferForm />}
      {role === 'surfclub' && <SurfClubForm />}
    </div>
  );
};

export default Register;
