import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrorMessage(''); // Clear error when user types
    };

    const validateForm = () => {
        if (formData.password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            return false;
        }
        if (!formData.email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const HandleSignup = async (event) => {
        event.preventDefault();
        console.log("Signup event triggered");

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const req = await axios.post('http://localhost:3001/signup', {
                firstName: formData.firstname,
                lastName: formData.lastname,
                userName: formData.username,
                email: formData.email,
                password: formData.password
            });

            setSuccessMessage('Account created successfully! 🎉');
            setLoading(false);
            
            // Reset form
            setFormData({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: ''
            });

            // Redirect after a short delay
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            console.log("Signup Error: ", err);
            setLoading(false);
            if (err.response) {
                setErrorMessage(`Error: ${err.response.data.message || err.response.data}`);
            } else {
                setErrorMessage("An error occurred during signup. Please try again.");
            }
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h1>Join Our Community! 🌟</h1>
                    <p>Start your health journey today</p>
                </div>
                
                <form className="signup-form" onSubmit={HandleSignup}>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="firstname">First Name</label>
                            <input 
                                type="text" 
                                id="firstname" 
                                name="firstname"
                                value={formData.firstname} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter your first name"
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input 
                                type="text" 
                                id="lastname" 
                                name="lastname"
                                value={formData.lastname} 
                                onChange={handleInputChange} 
                                required 
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username"
                            value={formData.username} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            value={formData.password} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Create a password (min 6 characters)"
                        />
                    </div>

                    {errorMessage && (
                        <div className="error-message">
                            <span>⚠️ {errorMessage}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="success-message">
                            <span>✅ {successMessage}</span>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={`signup-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner">🔄</span>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className="login-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
