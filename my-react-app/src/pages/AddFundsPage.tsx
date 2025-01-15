import React, { useState } from 'react';
import { addFunds } from '../services/ewalletService'; // Import API function

const AddFundsPage: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const handleAddFunds = async () => {
        try {
            if (amount <= 0) {
                setMessage('Please enter a valid amount.');
                return;
            }

            const response = await addFunds({ amount });
            setMessage(`Funds added successfully! New balance: $${response.newBalance.toFixed(2)}`);
            setAmount(0); // Reset the input field
        } catch (error) {
            console.error('Error adding funds:', error);
            setMessage('Failed to add funds. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Add Funds</h2>
            <div>
                <label htmlFor="amount">Amount: </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount to add"
                />
            </div>
            <button onClick={handleAddFunds}>Add Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddFundsPage;
