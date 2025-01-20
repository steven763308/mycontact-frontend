import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ewalletService from '../services/ewalletService';
import TransactionHistory from '../components/TransactionHistory';
import { use } from 'react';

const Dashboard = () => {
    //call api only after the token is stored
    const [isAuth, setIsAuth] = useState(false); //state track auth status
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [walletExists, setWalletExists] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('Token found, user is authenticated');
            setIsAuth(true);
            fetchData();
        }
    }, []); // Runs once on mount    

    const fetchData = async () => {
        try {
            const response = await ewalletService.getBalance();
            if(response.balance !== undefined){
                setBalance(Number(response.balance));
                setWalletExists(true);
            }else{
                setWalletExists(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setWalletExists(false);
        }
    };

    const handleCreateWallet = async () => {
        try {
            await ewalletService.createWallet();
            fetchData();
        } catch (error) {
            console.error('Error creating wallet:', error);
            if (error.response && error.response.data) {
                alert(`Error creating wallet: ${error.response.data.message}`);
            } else {
                alert('Error creating wallet. Please try again.');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    //const transactHistory

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to your eWallet Dashboard!</p>
            {walletExists ? (
                <div className="balance">
                    <h2>Your Balance:</h2>
                    <p>${balance.toFixed(2)}</p>

                    <div className='actions'>
                        <input type="number" value={amount} onChange={handleAmountChange} placeholder="Enter amount" />
                        <button onClick={addFunds}>Topup Funds</button>
                        <button onClick={subtractFunds}>Deduct Funds</button>
                    </div>
                </div>

            ) : (
                <div>
                    <p>You do not have a wallet yet...</p>
                    <button onClick={handleCreateWallet}>Create Wallet</button>
                </div>
            )}

            <div className="recent-transactions">
                <h3>Recent Transactions History</h3>
                <div>
                    {/* <TransactionHistory userId={userId}/> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;