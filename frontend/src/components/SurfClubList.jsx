// src/components/SurfClubList.jsx
import React from 'react';
import SurfClubCard from './SurfClubCard';

const SurfClubList = ({ clubs }) => {
    if (!clubs || clubs.length === 0) {
        return <p>No clubs available for this surf spot.</p>;
    }

    return (
        <div className="surf-club-list">
            {clubs.map((club) => (
                <SurfClubCard key={club.id} club={club} />
            ))}
        </div>
    );
};

export default SurfClubList;
