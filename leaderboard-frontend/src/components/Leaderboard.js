import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({ refreshTrigger }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; 

    useEffect(() => {
        fetchUsers();
    }, [refreshTrigger]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('https://leaderboard-task-anshika.onrender.com/api/users');
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h3>Leaderboard</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.rank}</td>
                            <td>{user.name}</td>
                            <td>{user.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: '10px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{
                            margin: '0 5px',
                            backgroundColor: currentPage === index + 1 ? 'lightblue' : ''
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
