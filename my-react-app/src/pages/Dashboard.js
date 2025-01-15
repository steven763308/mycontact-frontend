import React, { useState, useEffect } from 'react';
import { getBalance } from '../services/ewalletService';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await getBalance();
                setBalance(response.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Current Balance: ${balance.toFixed(2)}</h3>
            <div>
                <button onClick={() => window.location.href = '/add-funds'}>Add Funds</button>
                <button onClick={() => window.location.href = '/subtract-funds'}>Subtract Funds</button>
                <button onClick={() => window.location.href = '/transfer-funds'}>Transfer Funds</button>
            </div>
        </div>
    );
};

export default Dashboard;
