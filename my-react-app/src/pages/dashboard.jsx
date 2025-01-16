import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ewalletService from '../services/ewalletService';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const fetchData = async () => {
        try {
            const response = await ewalletService.getBalance();
            const newBalance = typeof response.balance === 'number' ? response.balance : 0;
            setBalance(newBalance);
            setTransactions(response.transactions || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setBalance(0); // Reset to default if error
            setTransactions([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addFunds = async (amount) => {
        try {
            const response = await axios.post(addFunds, { amount });
            setBalance(response.data.newBalance);
        } catch (error) {
            console.error('Error adding funds:', error);
        }
    };

    const subtractFunds = async (amount) => {
        try {
            const response = await axios.post(subtractFunds, { amount });
            setBalance(response.data.newBalance);
        } catch (error) {
            console.error('Error subtracting funds:', error);
        }
    };

    const transferFunds = async (amount, recipientId) => {
        try {
            const response = await axios.post(transferFunds, { amount, recipientId });
            setBalance(response.data.newBalance);
            fetchData();
        } catch (error) {
            console.error('Error transferring funds:', error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to your eWallet Dashboard!</p>
            <div className="balance">
                <h2>Your Balance</h2>
                <p>${typeof balance === 'number' ? balance.toFixed(2) : '0.00'}</p>
            </div>
            <div className="actions">
                <button onClick={() => addFunds(100)}>Add $100</button>
                <button onClick={() => subtractFunds(50)}>Subtract $50</button>
                <button onClick={() => transferFunds(25, 2)}>Transfer $25 to User #2</button>
            </div>
            <div className="recent-transactions">
                <h3>Recent Transactions</h3>
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>{transaction.description} - ${transaction.amount}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
