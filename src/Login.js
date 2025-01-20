import React from 'react'
import './Loginform.css';

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
        <p>
          Don’t have an account? <a href="#create-account">Create one</a>
        </p>
          </div>
    </div>
  )
}
