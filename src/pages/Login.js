
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { loginUser } from '../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate(); 
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data._id);
      navigate('/inventory');
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form  onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>
         Login failed: {error} <br />
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>}
        <button className="submit" type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;

