import React, { useState, useEffect } from 'react';
import { getBalance } from '../services/ewalletService';

const Dashboard = () => {
    const [balance, setBalance] = useState(0); // State to hold the balance

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                // Fetch the current balance from the backend
                const response = await getBalance();
                setBalance(response.balance); // Update state with fetched balance
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance(); // Call the fetchBalance function
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    return (
        <div>
            <h2>Dashboard</h2>
            {/* Fixed syntax for rendering the balance */}
            <h3>Current Balance: ${balance.toFixed(2)}</h3>
            <div>
                {/* Buttons to navigate to respective routes */}
                <button onClick={() => (window.location.href = '/add-funds')}>Add Funds</button>
                <button onClick={() => (window.location.href = '/subtract-funds')}>Subtract Funds</button>
                <button onClick={() => (window.location.href = '/transfer-funds')}>Transfer Funds</button>
            </div>
        </div>
    );
};

export default Dashboard;

