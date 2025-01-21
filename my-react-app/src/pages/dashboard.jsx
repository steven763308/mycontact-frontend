import React, { useState, useEffect } from "react";
import ewalletService from "../services/ewalletService";
import TransactionHistory from "../components/TransactionHistory";

const Dashboard = () => {
    const [isAuth, setIsAuth] = useState(false); // Track authentication status
    const [balance, setBalance] = useState(0); // Track wallet balance
    const [amount, setAmount] = useState(""); // Input value for amounts
    const [walletExists, setWalletExists] = useState(true); // Check if wallet exists

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Token found, user is authenticated");
            setIsAuth(true);
            fetchData();
        }
    }, []); // Run once on component mount

    const fetchData = async () => {
        try {
            const response = await ewalletService.getBalance();
            if (response?.balance !== undefined) {
                setBalance(Number(response.balance));
                setWalletExists(true);
            } else {
                setWalletExists(false);
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
            setWalletExists(false);
        }
    };

    const handleCreateWallet = async () => {
        try {
            await ewalletService.createWallet();
            fetchData(); // Refresh data after wallet creation
        } catch (error) {
            console.error("Error creating wallet:", error);
            const errorMessage = error.response?.data?.message || "Error creating wallet. Please try again.";
            alert(errorMessage);
        }
    };

    const handleAmountChange = (e) => setAmount(e.target.value);

    const validateAmount = (value) => {
        const num = Number(value);
        return !isNaN(num) && num > 0;
    };

    const addFunds = async () => {
        if (validateAmount(amount)) {
            try {
                const response = await ewalletService.addFunds(Number(amount));
                setBalance(Number(response.balance) || balance);
                fetchData(); // Refresh data
            } catch (error) {
                console.error("Error adding funds:", error);
            }
        } else {
            console.warn("Invalid amount entered.");
        }
    };

    const subtractFunds = async () => {
        if (validateAmount(amount)) {
            try {
                const response = await ewalletService.subtractFunds(Number(amount));
                setBalance(Number(response.balance) || balance);
                fetchData(); // Refresh data
            } catch (error) {
                console.error("Error subtracting funds:", error);
            }
        } else {
            console.warn("Invalid amount entered.");
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to your eWallet Dashboard!</p>

            {walletExists ? (
                <div className="balance-section">
                    <h2>Your Balance</h2>
                    <p>${balance.toFixed(2)}</p>

                    <div className="actions">
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                        />
                        <button onClick={addFunds}>Add Funds</button>
                        <button onClick={subtractFunds}>Subtract Funds</button>
                    </div>
                </div>
            ) : (
                <div className="no-wallet">
                    <p>You do not have a wallet yet.</p>
                    <button onClick={handleCreateWallet}>Create Wallet</button>
                </div>
            )}

            <div className="recent-transactions">
                <h3>Recent Transaction History</h3>
                <TransactionHistory /> {/* Include the component for transaction history */}
            </div>
        </div>
    );
};

export default Dashboard;
