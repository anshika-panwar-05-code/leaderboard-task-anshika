import React, { useState } from 'react';
import axios from 'axios';

const ClaimButton = ({ selectedUser, refreshLeaderboard }) => {
    const [message, setMessage] = useState('');

    const handleClaim = async () => {
        if (!selectedUser) {
            alert("Please select a user first.");
            return;
        }
        try {
            const res = await axios.post(`https://leaderboard-task-anshika.onrender.com/api/claim/${selectedUser}`);
            setMessage(res.data.message);
            refreshLeaderboard();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mb-4">
            <button onClick={handleClaim}>Claim Points</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ClaimButton;
