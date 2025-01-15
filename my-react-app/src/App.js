import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './src/pages/Dashboard';
import AddFundsPage from './pages/AddFundsPage';
import SubtractFundsPage from './pages/SubtractFundsPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/add-funds" element={<AddFundsPage />} />
                <Route path="/subtract-funds" element={<SubtractFundsPage />} />
                <Route path="/transactions" element={<TransactionHistoryPage />} />
            </Routes>
        </Router>
    );
};

export default App;
