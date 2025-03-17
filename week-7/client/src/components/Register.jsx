// register code here
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router';

const Register = () => {
    // call the functions onClick of button.
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSignup(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/signup' ,{
                username: username,
                password: password
            });
            console.log(response);
            
        } catch (error) {
            setError(error.message);
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
            </form>
        </div>
    )
}

export default Register