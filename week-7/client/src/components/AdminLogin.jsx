import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const AdminLogin = () => {
  const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleLogin(e) {
        e.preventDefault();
        // console.log(username + " " + password)
        try {
            const response = await axios.post('http://localhost:3000/admin/signin', {
                username: username,
                password: password
            }); 
            console.log(response)
            console.log(response.data.token);
            const token = "Bearer " + response.data.token;
            localStorage.setItem("adminToken", token);
            setError("");
            navigate('/')
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                setError(error.response.data.message);
            } else {
                setError("Something went wrong");
            }
            console.error("Login failed:", error.response ? error.response.data : error.message);
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
                <button onClick={handleLogin}>Login</button>
                <h1>{error}</h1>
            </form>
        </div>
    )
}

export default AdminLogin