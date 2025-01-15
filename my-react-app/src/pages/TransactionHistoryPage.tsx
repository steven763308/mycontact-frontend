import React, { useState, useEffect } from 'react';
import { getTransactionHistory } from '../services/ewalletService';

const TransactionHistoryPage: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactionHistory();
                setTransactions(response.transactions);
            } catch (error) {
                console.error('Error fetching transaction history:', error);
                setError('Failed to load transaction history. Please try again.');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction History</h2>
            {error && <p>{error}</p>}
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.type}: ${transaction.amount.toFixed(2)} on {transaction.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistoryPage;
