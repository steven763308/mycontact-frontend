import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Transfer from "./pages/transfer";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/navBar"; // Import NavBar component

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Navigate replace to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
