import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>E-Wallet App</h1>
            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/add-funds">Add Funds</Link>
                <Link to="/subtract-funds">Subtract Funds</Link>
                <Link to="/transfer-funds">Transfer Funds</Link>
            </nav>
        </header>
    );
};

export default Header;
