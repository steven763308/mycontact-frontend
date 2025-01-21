import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ewallet';

//assume storing token in localStorage
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add a request interceptor to include the token dynamically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('Token is null or undefined');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//create wallet
const createWallet = async () => {
    try {
        const userId = localStorage.getItem('token'); // Retrieve the user ID from localStorage
        if (!userId) {
            throw new Error('User ID is not available');
        }

        const response = await axiosInstance.post(`/create`, {
            userId: userId // Include the user ID in the request payload
        });
        return response.data;
    } catch (error) {
        console.error('Error creating wallet:', error);
        throw error;
    }
};

const getBalance = async () => {
    // Log to check if the token exists in localStorage at the time of request
    const token = localStorage.getItem('token');
    if (token) {
        console.log('Token exists:', token);
    } else {
        console.log('No token found');
    }

    const response = await axiosInstance.get(`/balance`);
    return response.data;
};

/**
 * Add funds to the user's e-wallet.
 * @param amount - Object containing the amount to add.
 * @returns The updated balance after adding funds.
 */
const addFunds = async (amount) => {
    try {
        const response = await axiosInstance.post(`/addFunds`, {amount});
        return response.data; // The backend is expected to return the new balance
    }catch(error){
        console.error('Error adding funds:', error);
        throw error; // Re-throw to let the caller handle it
    }
};

/**
 * Subtract funds from the user's e-wallet.
 * @param amount - Object containing the amount to subtract.
 * @returns The updated balance after subtracting funds.
 */
const subtractFunds = async (amount) => {
    try {
        const response = await axiosInstance.post(`/subtractFunds`, {amount});
        return response.data; // The backend is expected to return the new balance
    } catch (error) {
        console.error('Error subtracting funds:', error);
        throw error;
    }
};

/**
 * Transfer funds to another user.
 * @param amount - Object containing the recipient's ID and the amount to transfer.
 * @param recipientId - The recipient's ID.
 * @returns The updated balance after the transfer.
 */
const transferFunds = async (amount, recipientId) => {
    try {
        const response = await axiosInstance.post(`/transferFunds`, {amount, recipientId});
        return response.data; // The backend is expected to return the new balance
    } catch (error) {
        throw new Error(error.response.data.error || 'Error transferring funds, no wallet found');
    }
};

/**
 * Retrieve the user's transaction history.
 * @returns An array of transactions.
 */
const getTransactionHistory = async (userId) => {
    try {
        const response = await axiosInstance.get(`/transactionHistory/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Error fetching transaction history');
    }
};

export default{
    getBalance,
    createWallet,
    addFunds,
    subtractFunds,
    transferFunds,
    getTransactionHistory,
};