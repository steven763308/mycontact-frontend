import React, { useState, useEffect } from 'react';
import ewalletService from '../services/ewalletService';

const Transfer = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await ewalletService.getBalance();
                setBalance(Number(response.balance)); // Ensure balance is a number
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await ewalletService.transferFunds(amount, recipient);
            setMessage(`Transferred $${amount} to user_ID: ${recipient}`);
            setBalance(Number(response.newBalance)); // Ensure new balance is a number
        } catch (error) {
            setMessage('Error transferring funds: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Transfer Funds</h1>
            <div>
                <label>Funds Balance:</label>
                <p>${balance.toFixed(2)}</p>
            </div>
            <form onSubmit={handleTransfer}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Recipient U_ID:</label>
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Transfer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Transfer;