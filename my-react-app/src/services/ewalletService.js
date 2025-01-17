import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ewallet';

//assume storing token in localStorage
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` //token include in headers
    },
    withCredentials: true
})

const getBalance = async () => {
    const response = await axios.get(`${API_URL}/balance`);
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
        console.error('Error transferring funds:', error);
        throw error;
    }
};

/**
 * Retrieve the user's transaction history.
 * @returns An array of transactions.
 */
const getTransactionHistory = async () => {
    try {
        const response = await axiosInstance.get(`/transactions`);
        return response.data; // The backend should return an array of transactions
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw error;
    }
};

export default{
    getBalance,
    addFunds,
    subtractFunds,
    transferFunds,
    getTransactionHistory,
};