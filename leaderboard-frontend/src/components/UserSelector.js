import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserSelector = ({ selectedUser, setSelectedUser, refreshTrigger }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [refreshTrigger]); // re-fetch whenever refreshTrigger changes

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="mb-4">
            <label>Select User: </label>
            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                <option value="">Select</option>
                {users.map((user) => (
                    <option key={user._id} value={user._id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserSelector;
