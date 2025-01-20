import React from 'react'
import './Registration.css'
import { Link } from 'react-router-dom'
export default function Registration() {
  return (
    <div className="registry-form">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender">
            <option value="" disabled selected>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm your password" />
        </div>
        <button type="submit" className="register-button">Register</button>
        <p style={{marginTop:"20px"}}>
          Already have an account? <Link to='/Login'>Log in</Link>
        </p>
      </form>
    </div>
  )
}
