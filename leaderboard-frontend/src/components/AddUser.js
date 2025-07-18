import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ refreshLeaderboard }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleAddUser = async () => {
        if (!name.trim()) {
            alert("Please enter a user name.");
            return;
        }
        try {
            const res = await axios.post('https://leaderboard-task-anshika.onrender.com/api/users', { name });
            setMessage(`User ${res.data.name} added successfully!`);
            setName('');
            refreshLeaderboard();
        } catch (error) {
            console.error(error);
            setMessage('Error adding user. Maybe name already exists.');
        }
    };

    return (
        <div className="mb-4">
            <h3>Add New User</h3>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user name"
            />
            <button onClick={handleAddUser}>Add User</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddUser;
