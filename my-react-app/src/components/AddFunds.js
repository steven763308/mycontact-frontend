import React, { useState } from 'react';
import { addFunds } from '../services/ewalletService';

const AddFunds = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleAddFunds = async () => {
        try {
            const response = await addFunds(parseFloat(amount));
            setMessage(`Funds added successfully! New balance: $${response.newBalance}`);
            setAmount('');
        } catch (error) {
            setMessage('Error adding funds: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h2>Add Funds</h2>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleAddFunds}>Add Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddFunds;
