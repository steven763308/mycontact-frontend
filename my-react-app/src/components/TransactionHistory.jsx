import React, { useEffect, useState } from 'react';
import ewalletService from '../services/ewalletService';

const TransactionHistory = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await ewalletService.getTransactionHistory(userId);
                setTransactions(response);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTransactions();
    }, [userId]);

    return (
        <div>
            <h2>Transaction History</h2>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;