import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state
    const navigate = useNavigate();

    const HandleSignup = async (event) => {
        event.preventDefault();
        console.log("Signup event triggered");

        setLoading(true); // Start loading indicator

        try {
            const req = await axios.post('http://localhost:3001/signup', {
                firstName: firstname,
                lastName: lastname,
                userName: username,
                email: email,
                password: password
            });

            alert("Signup successful!"); // Display success message
            setLoading(false); // Stop loading indicator
            navigate('/'); // Redirect to login page

            // Reset form after successful signup
            setFirstName('');
            setLastName('');
            setUserName('');
            setEmail('');
            setPassword('');

        } catch (err) {
            console.log("Signup Error: ", err);
            setLoading(false); // Stop loading indicator
            if (err.response) {
                alert(`Error: ${err.response.data}`); // Show error from backend
            } else {
                alert("An error occurred during signup. Please try again.");
            }
        }
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Signup</h1>
            <div className="container">
                <form method="POST" onSubmit={HandleSignup}>
                    <label htmlFor="firstname" required>First Name: </label>
                    <input type="text" id="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                    <br /><br />
                    
                    <label htmlFor="lastname">Last Name:  </label>
                    <input type="text" id="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                    <br /><br />

                    <label htmlFor="username" required>Username: </label>
                    <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                    <br /><br />

                    <label htmlFor="email">Email:  </label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <br /><br />

                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <br /><br />

                    <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
