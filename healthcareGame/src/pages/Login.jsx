import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("Attempting to login with:", { username, password });  // Debugging: Log input values
    
        try {
            const response = await axios.post('http://localhost:3001/login', {
                userName: username.toLowerCase(), // Send username in lowercase
                password: password,
            });
    
            console.log("Server Response:", response.data);  // Log the response from the server
    
            if (response.data.success) {
                alert("Login Successful");
                navigate('/home');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            console.log("Error Response:", err.response?.data); // Log the error message from backend
            setErrorMessage(err.response?.data?.message || "Invalid credentials. Please try again.");
        }
    };
    
    
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className="container">
                <form method="POST" onSubmit={handleLogin}>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <br /><br />
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br /><br />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button type="submit">Login</button>
                </form>

                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};

export default Login;
