import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

// Add request interceptor for auth token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        // This will confirm if the token is null or a valid string
        console.log("Retrieved token:", token);  
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            // Check what headers are being sent
            console.log("Headers after adding token:", config.headers); 
        } else {
            //means after login if no token in headers
            console.warn("No token available, sending request without authorization."); 
        }
        return config;
    },
    error => {
        console.error('Error on sending request:', error);
        return Promise.reject(error);
    }
);

// Auth service
export const authService = {
    login: async (email, password) => {
        console.log("Attempting login for:", email); // Log email attempting to login
        const response = await api.post('/users/login', {email, password});
        console.log("Login response:", response); // Log response from login attempt
        if (response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
            //console.log("Token stored:", response.data.accessToken); // Log token storage
            console.log("Token stored:", localStorage.getItem("token")); //log the token just been stored
        }
        return response.data;
    },
    register: async (username, email, password) => {
        console.log("Attempting registration for:", email); // Log email attempting to register
        return await api.post('/users/register', {username, email, password});
    },
    logout: () => {
        console.log("Logging out and removing token."); // Log logout action
        localStorage.removeItem('token');
    }
};

// Wallet service
export const walletService = {
    createWallet: async () => {
        console.log("Creating a new wallet."); // Log wallet creation
        return await api.post('/ewallet');
    },
    getBalance: async () => {
        console.log("Fetching wallet balance."); // Log balance check
        const response = await api.get('/ewallet/balance');
        console.log("Balance fetched:", response.data); // Log fetched balance
        return response.data;
    },
    addBalance: async (amount) => {
        console.log("Adding balance:", amount); // Log amount being added
        return await api.post('/ewallet/add', {amount});
    },
    transfer: async (toUserId, amount) => {
        console.log(`Transferring ${amount} to user ID: ${toUserId}`); // Log transfer details
        return await api.post('/ewallet/transfer', {toUserId, amount});
    }
};

export const contactService = {
    getAllContacts: async() => {
        console.log("Fetching all contacts."); // Log fetching all contacts
        const response = await api.get('/contacts');
        console.log("Contacts fetched:", response.data); // Log contacts data
        return response.data;
    },
    createContact: async(contactData) => {
        console.log("Creating contact with data:", contactData); // Log contact creation data
        const response = await api.post('/contacts', contactData);
        console.log("Contact created:", response.data); // Log new contact data
        return response.data;
    },
    updateContact: async(id, contactData) => {
        console.log(`Updating contact ID ${id} with data:`, contactData); // Log contact update details
        const response = await api.put(`/contacts/${id}`, contactData);
        console.log("Contact updated:", response.data); // Log updated contact data
        return response.data;
    },
    deleteContact: async(id) => {
        console.log(`Deleting contact ID ${id}`); // Log contact deletion
        const response = await api.delete(`/contacts/${id}`);
        console.log("Contact deleted:", response.data); // Log deletion confirmation
        return response.data;
    }
};
