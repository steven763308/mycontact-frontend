import React, { useState } from 'react';
import { subtractFunds } from '../services/ewalletService';

const SubtractFundsPage: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const handleSubtractFunds = async () => {
        try {
            if (amount <= 0) {
                setMessage('Please enter a valid amount.');
                return;
            }

            const response = await subtractFunds({ amount });
            setMessage(`Funds subtracted successfully! New balance: $${response.newBalance.toFixed(2)}`);
            setAmount(0); // Reset the input field
        } catch (error) {
            console.error('Error subtracting funds:', error);
            setMessage('Failed to subtract funds. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Subtract Funds</h2>
            <div>
                <label htmlFor="amount">Amount: </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount to subtract"
                />
            </div>
            <button onClick={handleSubtractFunds}>Subtract Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SubtractFundsPage;
