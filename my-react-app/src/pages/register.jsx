import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //check password matches confirmPassword
        if(formData.password !== formData.confirmPassword){
            setError('Passwords do not match');
            return;
    }

    try {
        //assume authService.register returns a promise and handle registration
        const response = await authService.register(formData.username, formData.email, formData.password);
        console.log('Registration successful', response); //log or handle response
        alert('Registration successful!'); //popup registered alert
        navigate('/login'); //navigate to login after registered
    } catch (error) {
        setError(error.response?.data?.message || 'Failed to register, please try again.') //display backend error messages
    }
};

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>} {/*display error message*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;