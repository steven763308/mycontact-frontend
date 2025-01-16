//import React, { Children } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//CHONG
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Transfer from './pages/transfer';
import Profile from './pages/profile';


//import Dashboard from './pages/Dashboard';
//import AddFundsPage from './pages/AddFundsPage';
//import SubtractFundsPage from './pages/SubtractFundsPage';
//import TransferFundsPage from './pages/TransferFundsPage';


//chong sample code
const ProtectedRoute = ({children}) =>{
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App(){
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path= "/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/transfer"
                    element={
                        <ProtectedRoute>
                            <Transfer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Router>
    );
}

export default App;









/*
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
*/