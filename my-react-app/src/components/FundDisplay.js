import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const FundDisplay = () => {
    const [funds, setFunds] = useState(0);

    useEffect(() => {
        // Fetch current funds from backend
        axios.get('/api/ewallet/funds')
            .then(response => {
                setFunds(response.data.funds);
            })
            .catch(error => {
                console.error('Error fetching funds:', error);
            });
    }, []);

    return (
        <div>
            <h2>Current Balance</h2>
            <p>${funds.toFixed(2)}</p>
        </div>
    );
};

export default FundDisplay;
