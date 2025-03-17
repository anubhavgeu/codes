// login code here
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const Login = () => {
    // call the functions onClick of button.
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleLogin(e) {
        e.preventDefault();
        // console.log(username + " " + password)
        try {
            const response = await axios.post('http://localhost:3000/users/signin', {
                username: username,
                password: password
            }); 
            console.log(response)
            console.log(response.data.token);
            const message = response.data.message;
            if (message === "Either User doesn't exists or password is wrong") {
                setError("Either User doesn't exists or password is wrong");
                return;
            }
            setError("");
            localStorage.setItem("token", response.data.token);
            navigate('/')
        } catch (error) {
            setError(error.message);
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
            </form>
        </div>
    )
}

export default Login