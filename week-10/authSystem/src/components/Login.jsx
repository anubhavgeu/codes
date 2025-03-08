import React, { useState } from 'react'

const Login = ({setIsLoggedIn, setUsername, setPassword}) => {
  function handleLogin() {
    setIsLoggedIn(true);
  }
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "300px", textAlign: "center" }}>
        <h2>Login</h2>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Username"
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          style={{ backgroundColor: "#3b82f6", color: "white", padding: "10px", borderRadius: "5px", border: "none", cursor: "pointer", width: "100%" }} onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login