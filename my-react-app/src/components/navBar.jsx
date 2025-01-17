import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation(); // Hook to access the current route location

    // Do not display NavBar on the login page
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/transfer">Transfer</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;

const handleLogout = () => {
    // Clear user token or session and redirect or refresh the page
    localStorage.removeItem('token');
    window.location.href = '/login'; // Or use history.push if within React Router context
}
