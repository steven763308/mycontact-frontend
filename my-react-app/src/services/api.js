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
