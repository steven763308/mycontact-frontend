import React, { useState } from 'react';
import { subtractFunds } from '../services/ewalletService';

const SubtractFunds = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubtractFunds = async () => {
        try {
            const response = await subtractFunds(parseFloat(amount));
            setMessage(`Funds subtracted successfully! New balance: $${response.newBalance}`);
            setAmount('');
        } catch (error) {
            setMessage('Error subtracting funds: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2>Subtract Funds</h2>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSubtractFunds}>Subtract Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SubtractFunds;
