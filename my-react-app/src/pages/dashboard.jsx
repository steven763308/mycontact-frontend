import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ewalletService from '../services/ewalletService';
import { use } from 'react';

const Dashboard = () => {
    //call api only after the token is stored
    const [isAuth, setIsAuth] = useState(false); //state track auth status
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

    //auth check and data fetch
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            console.log('Token found, user is authenticated');
            setIsAuth(true); //set auth to true to trigger data fetch
        }
    }, []); // dependency array ensures it only runs once

    //data fetching effect
    useEffect(() => {
        if(isAuth){
            console.log('Dashboard mounted, fetching data...');
            fetchData();
        }
    }, [isAuth]); //dependency on isAuth

    const fetchData = async () => {
        console.log('Attempting to fetch balance and transactions...');
        try {
            const balanceData = await ewalletService.getBalance();
            const transactionsData = await ewalletService.getTransactionHistory();

            setBalance(Number(balanceData.balance) || 0); //ensure numeric value
            console.log('Balance fetched:', balanceData);
            setTransactions(transactionsData.transactions || []); //fallback to empty array if undefined
            console.log('Transactions fetched:', transactionsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const validateAmount = (value) =>{
        const num = Number(value);
        return !isNaN(num) && num > 0;
    };

    const addFunds = async () => {
        if (validateAmount(amount)) {
            console.log('Adding funds:', amount);
            try {
                const newBalance = await ewalletService.addFunds(Number(amount));
                console.log('New balance after adding funds:', newBalance);
                setBalance(Number(newBalance.balance) || balance);
                fetchData(); // Refresh data
            } catch (error) {
                console.error('Error adding funds:', error);
            }
        }else{
            console.warn('Invalid amount entered.');
        }
    };

    const subtractFunds = async () => {
        if (validateAmount(amount)) {
            console.log('Subtracting funds:', amount);
            try {
                const newBalance = await ewalletService.subtractFunds(Number(amount));
                console.log('New balance after subtracting funds:', newBalance);
                setBalance(Number(newBalance.newBalance) || balance);
                fetchData(); // Refresh data
            } catch (error) {
                console.error('Error subtracting funds:', error);
            }
        }else{
            console.warn('Invalid amount entered.');
        }
    };

    const transferFunds = async (amount, recipientId) => {
        console.log('Transferring funds:', amount, 'to recipient ID:', recipientId);
        try {
            const response = await ewalletService.transferFunds(amount, recipientId);
            console.log('New balance after transferring funds:', response);
            setBalance(response.data.newBalance);
            fetchData();
        } catch (error) {
            console.error('Error transferring funds:', error);
        }
    };

    //const transactHistory

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to your eWallet Dashboard!</p>
            <div className="balance">
                <h2>Your Balance:</h2>
                <p>${balance.toFixed(2)}</p>
            </div>
            <div className="actions">
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                />
                <button onClick={addFunds}>Topup Funds</button>
                <button onClick={subtractFunds}>Deduct Funds</button>
            </div>

            <div className="recent-transactions">
                <h3>Recent Transactions History</h3>
                <ul>
                    {transactions.map((transaction, index) => (
                        <li key={index}>
                            {transaction.description} - ${transaction.amount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
