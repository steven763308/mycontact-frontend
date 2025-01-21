import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/api";
//import "./login.css"; // Ensure the correct CSS file is imported

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "steven1234@gmail.com",
        password: "123",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Attempt login using authService
            await authService.login(formData.email, formData.password);

            // Debug: Log the token stored in localStorage
            const token = localStorage.getItem("token");
            console.log("Token successfully stored:", token);

            console.log("Login successful. Navigating to dashboard...");
            navigate("/dashboard"); // Redirect to dashboard on success
        } catch (err) {
            console.error("Login failed:", err.message);
            setError("Invalid email or password"); // Display error to user
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>

                <div className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
