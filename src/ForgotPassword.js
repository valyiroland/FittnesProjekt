import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const { token } = useParams(); // Token beolvasása az URL-ből
  const navigate = useNavigate(); // Navigáció kezelés

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      // Ha nincs token az URL-ben, visszairányítás a főoldalra
      navigate('/');
    }
  }, [token, navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    // Az URL-be illesztjük a token-t és a newPassword-ot
    const url = `http://localhost:5071/api/ForgotPassword/NewPassword?token=${token}&newPassword=${password}`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);  // A sikeres üzenet
        setError('');
        navigate('/'); // Redirect to login page after success
      } else {
        const errorData = await response.json(); // JSON formátumban kapjuk a hibát
        setError(errorData.message || 'Failed to change password.');
        setMessage('');
      }
    } catch (err) {
      console.error('Fetch error: ', err);
      setError('An error occurred while changing your password.');
      setMessage('');
    }
  };
  

  return (
    <div>
      <div className="content2">
        <div className="login-form">
          <h2>New password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
            </div>
            <button className="login-button" type="submit">Save</button>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
