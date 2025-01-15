import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddFundsPage from './pages/AddFundsPage';
import SubtractFundsPage from './pages/SubtractFundsPage';
import TransferFundsPage from './pages/TransferFundsPage';

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/add-funds">Add Funds</Link></li>
                    <li><Link to="/subtract-funds">Subtract Funds</Link></li>
                    <li><Link to="/transfer-funds">Transfer Funds</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-funds" element={<AddFundsPage />} />
                <Route path="/subtract-funds" element={<SubtractFundsPage />} />
                <Route path="/transfer-funds" element={<TransferFundsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
