import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const { token } = useParams(); // Token beolvasása az URL-ből
  const navigate = useNavigate(); // Navigáció kezelés

  useEffect(() => {
    if (!token) {
      // Ha nincs token az URL-ben, visszairányítás a főoldalra
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div>
        <div className="content2">
      <div className="login-form">
        <h2>New password</h2>
        <form>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Enter your new password"         
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Confirm password"         
              required
            />
          </div>
          <button className="login-button" type="submit">Save</button>
          </form>
          </div>
          </div>
    </div>
  )
}
