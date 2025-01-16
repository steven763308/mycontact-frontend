/*
import axios from 'axios';

// Create an Axios instance with default options
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api/ewallet', // Update this URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies or authorization headers if needed
});

// Function to set the Authorization token dynamically
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;

*/

import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

//add request interceptor for auth token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

//auth service
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/users/login', {email, password});
        if(response.data.accessToken){
            localStorage.setItem("token", response.data.accessToken);
        }
        return response.data;
    },
    register: async (username, email, password) => {
        return await api.post('/users/register', {username, email, password});
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};

//wallet service
export const walletService = {
    createWallet: async () => {
        return await api.post('/ewallet');
    },
    getBalance: async () => {
        const response = await api.get('/ewallet/balance');
        return response.data;
    },
    addBalance: async (amount) => {
        return await api.post('/ewallet/add', {amount});
    },
    transfer: async (toUserId, amount) => {
        return await api.post('/ewallet/transfer', {toUserId, amount});
    }
};

export const contactService = {
    getAllContacts: async() => {
        const response = await api.get('/contacts');
        return response.data;
    },
    createContact: async(contactData) => {
        const response = await api.post('/contacts', contactData);
        return response.data;
    },
    updateContact: async(id, contactData) => {
        const response = await api.put(`/contacts/${id}`, contactData);
        return response.data;
    },
    deleteContact: async(id) => {
        const response = await api.delete(`/contacts/${id}`);
        return response.data;
    }
};
