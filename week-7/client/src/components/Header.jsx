import React from 'react'
import {useNavigate} from 'react-router';
const Header = () => {
    let navigate = useNavigate();
    function handleLogin() {
        navigate('/login');
    }
    function handleSignup() {
      navigate('/signup');
    }
  return (

    <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', padding: '20px', backgroundColor: 'blue'}}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Header