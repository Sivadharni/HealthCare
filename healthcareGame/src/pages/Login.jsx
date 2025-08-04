import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        
        console.log("Attempting to login with:", { username, password });  // Debugging: Log input values
    
        try {
            const response = await axios.post('http://localhost:3001/login', {
                userName: username.toLowerCase(), // Send username in lowercase
                password: password,
            });
    
            console.log("Server Response:", response.data);  // Log the response from the server
    
            if (response.data.success) {
                // Store user data
                localStorage.setItem('user', JSON.stringify({ username }));
                localStorage.setItem('userName', username);
                
                // Show success animation
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            console.log("Error Response:", err.response?.data); // Log the error message from backend
            setErrorMessage(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back! 👋</h1>
                    <p>Sign in to continue your health journey</p>
                </div>
                
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder="Enter your username"
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    {errorMessage && (
                        <div className="error-message">
                            <span>⚠️ {errorMessage}</span>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-spinner">🔄</span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="signup-link">
                    <p>Don't have an account? <Link to="/Signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
