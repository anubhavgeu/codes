import React from 'react'
import {useNavigate} from 'react-router';
const Header = () => {
    let navigate = useNavigate();
    function handleLogin() {
        navigate('/login');
    }
    function handleAdminLogin() {
      navigate('/admin-signin');
    }
    function handleAdminSignUp() {
      navigate('/admin-signup')
    }
    function handleSignup() {
      navigate('/signup');
    }
    function handleLogout() {
      localStorage.removeItem("userToken");
      navigate('/');
    }
  return (

    <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', padding: '20px', backgroundColor: 'blue'}}>
        <button onClick={handleLogin}>User Login</button>
        <button onClick={handleAdminLogin}>Admin Login</button>
        <button onClick={handleSignup}>User Signup</button>
        <button onClick={handleAdminSignUp}>Admin Signup</button>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header