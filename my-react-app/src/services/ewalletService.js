import api from './api';

// Function to add funds
export const addFunds = async (amount) => {
    const response = await api.post('/addFunds', { amount });
    return response.data; // Backend should return updated balance or success message
};

// Function to subtract funds
export const subtractFunds = async (amount) => {
    const response = await api.post('/subtractFunds', { amount });
    return response.data;
};

// (Optional) Function to fetch balance
export const getBalance = async () => {
    const response = await api.get('/balance');
    return response.data; // Backend should return the current balance
};

// (Optional) Function to fetch transaction history
export const getTransactionHistory = async () => {
    const response = await api.get('/transactions');
    return response.data; // Backend should return transaction history
};
