import React from 'react'
import './Loginform.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div class="content">
        <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p style={{marginTop:"20px"}}>
          Don’t have an account? <Link to='/Registration'>Create one</Link>
        </p>
          </div>
    </div>
  )
}
