// services/ewalletService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/ewallet";

// Axios instance with base configuration
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// E-wallet services
const ewalletService = {
    createWallet: async () => {
        const response = await api.post("/create");
        return response.data;
    },

    getBalance: async () => {
        const response = await api.get("/balance");
        return response.data;
    },

    addFunds: async (amount) => {
        const response = await api.post("/addFunds", { amount });
        return response.data;
    },

    subtractFunds: async (amount) => {
        const response = await api.post("/subtractFunds", { amount });
        return response.data;
    },

    transferFunds: async (recipientId, amount) => {
        const response = await api.post("/transferFunds", { recipientId, amount });
        return response.data;
    },

    getTransactionHistory: async (userId) => {
        const response = await api.get(`/transactionHistory/${userId}`);
        return response.data;
    },
};

export default ewalletService;