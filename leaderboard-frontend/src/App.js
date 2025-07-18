import React, { useState } from 'react';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import './App.css';


function App() {
    const [selectedUser, setSelectedUser] = useState('');
    const [refresh, setRefresh] = useState(false);

    const refreshLeaderboard = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>Leaderboard Task</h1>
            <AddUser refreshLeaderboard={refreshLeaderboard} />
          <UserSelector selectedUser={selectedUser} setSelectedUser={setSelectedUser} refreshTrigger={refresh} />
            <ClaimButton selectedUser={selectedUser} refreshLeaderboard={refreshLeaderboard} />
            <Leaderboard refreshTrigger={refresh} />
        </div>
    );
}

export default App;
