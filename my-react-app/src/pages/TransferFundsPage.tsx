import React, { useState } from 'react';
import { transferFunds } from '../services/ewalletService';

const TransferFundsPage: React.FC = () => {
    const [recipientId, setRecipientId] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const handleTransferFunds = async () => {
        try {
            if (amount <= 0 || recipientId.trim() === '') {
                setMessage('Please enter a valid recipient ID and amount.');
                return;
            }

            const response = await transferFunds({ recipientId, amount });
            setMessage(`Funds transferred successfully! New balance: $${response.newBalance.toFixed(2)}`);
            setRecipientId(''); // Reset input fields
            setAmount(0);
        } catch (error) {
            console.error('Error transferring funds:', error);
            setMessage('Failed to transfer funds. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Transfer Funds</h2>
            <div>
                <label htmlFor="recipient">Recipient ID: </label>
                <input
                    type="text"
                    id="recipient"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    placeholder="Enter recipient ID"
                />
            </div>
            <div>
                <label htmlFor="amount">Amount: </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount to transfer"
                />
            </div>
            <button onClick={handleTransferFunds}>Transfer Funds</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TransferFundsPage;
