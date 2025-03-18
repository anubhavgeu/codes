import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const AdminSignup = () => {
  const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSignup(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/signup' ,{
                username: username,
                password: password
            });
            console.log(response.data.message);
            setError("");
            navigate('/')
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                setError(error.response.data.message);
            } else {
                setError("Something went wrong");
            }
        }
    }
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <form>
                <label htmlFor="username">Enter your username:</label>
                <input type="text" id='username' onChange={(e) => setUsername(e.target.value)} placeholder='Enter your username'/>
                <br />
                <label htmlFor="password">Enter your Password:</label>
                <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password'/>
                <br />
                <button onClick={handleSignup}>Signup</button>
                <h1>{error}</h1>
            </form>
        </div>
    )
}

export default AdminSignup;