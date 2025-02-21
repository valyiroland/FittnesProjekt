import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
export default function ForgotPassword() {
  const { token } = useParams(); // Token beolvasása az URL-ből
  const navigate = useNavigate(); // Navigáció kezelés

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Jelszó láthatóságának állapota
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // A megerősítő jelszó láthatósága

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
            <div className="form-group password-group">
              <input
                type={passwordVisible ? "text" : "password"} // A jelszó láthatóságának szabályozása
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)} // A jelszó láthatóságának váltása
              >
                {passwordVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
</svg>}
              </button>
            </div>
            <div className="form-group password-group">
              <input
                type={confirmPasswordVisible ? "text" : "password"} // A megerősítő jelszó láthatóságának szabályozása
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // A megerősítő jelszó láthatóságának váltása
              >
                {confirmPasswordVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
</svg>}
              </button>
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
