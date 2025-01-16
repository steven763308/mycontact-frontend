import React, { useState } from 'react';

const Transfer = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');

    const handleTransfer = (e) => {
        e.preventDefault();
        // Add your transfer logic here
        setMessage(`Transferred ${amount} to ${recipient}`);
    };

    return (
        <div>
            <h1>Transfer Funds</h1>
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
                    <label>Recipient:</label>
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