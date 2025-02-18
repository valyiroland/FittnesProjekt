import React, { useState } from 'react';
import './Email.css';

export default function Email() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // Megakadályozza, hogy a forma automatikusan újratöltse az oldalt

    // Ellenőrzés: Email cím nem lehet üres
    if (!email) {
      setError('Please enter an email address.');
      return;
    }

    // Az URL-t dinamikusan építjük fel az email paraméterrel
    const url = `http://localhost:5071/api/ForgotPassword?email=${encodeURIComponent(email)}`;

    try {
      const response = await fetch(url, {
        method: 'POST',  // POST metódus
        headers: {
          'Content-Type': 'application/json',  // JSON formátumban küldjük az adatokat (de valójában nem küldünk JSON-t most)
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred while sending the email.');
        setMessage('');
      } else {
        setMessage('An email has been sent to your email address.');
        setError('');
      }
    } catch (err) {
      console.error('Fetch error: ', err);
      setError('Either the email address is incorrect or an email has already been sent to this address.');
      setMessage('');
    }
  };

  return (
    <div className="content2">
      <div className="login-form">
        <h2>Email address</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}  // Az email cím változtatása
              required
            />
          </div>
          <button className="login-button" type="submit">Send email</button>
          {message && <p className="success-message">{message}</p>} 
          {error && <p className="error-message">{error}</p>} 
        </form>
      </div>
    </div>
  );
}
