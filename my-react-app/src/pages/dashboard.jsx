import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ewalletService from '../services/ewalletService';

const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const balanceData = await ewalletService.getBalance();
            setBalance(balanceData.balance);
            const transactionsData = await ewalletService.getTransactionHistory();
            setTransactions(transactionsData.transactions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const addFunds = async () => {
        if(amount > 0){
            try {
                const newBalance = await ewalletService.addFunds(Number(amount));
                setBalance(newBalance.balance);
                fetchData(); //refresh data
            } catch (error) {
                console.error('Error adding funds:', error);
            }
        }
        
    };

    const subtractFunds = async () => {
        if(amount > 0){
            try {
                const newBalance = await ewalletService.subtractFunds(Number(amount));
                setBalance(newBalance.newBalance);
                fetchData(); //refresh data
            } catch (error) {
                console.error('Error subtracting funds:', error);
            }
        }
    };

    //transfer funds (this logic should not be here.)
    const transferFunds = async (amount, recipientId) => {
        try {
            const response = await axios.post(transferFunds, { amount, recipientId });
            setBalance(response.data.response.balance || 0);
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
                <h3>Recent Transactions</h3>
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
