import AuthSystem from './components/AuthSystem';
import './Auth.css';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  if (isLoggedIn) {
    return <AuthSystem setIsLoggedIn={setIsLoggedIn} username={username}/>
  }
  return <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setPassword = {setPassword}/>
}

export default App;
