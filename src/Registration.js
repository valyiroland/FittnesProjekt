import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js"; // Importáljuk a CryptoJS könyvtárat
import { Link } from "react-router-dom";
import './Registration.css';

const RegistryForm = () => {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Jelszó láthatóságának állapota
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // A megerősítő jelszó láthatósága

  // 🔹 Véletlenszerű 16 bájtos só generálása
  const generateSalt = () => {
    return CryptoJS.lib.WordArray.random(16).toString();
  };

  // 🔹 Jelszó és só hash-elése SHA-256-tal
  const hashPassword = (password, salt) => {
    return CryptoJS.SHA256(password + salt).toString();
  };

  // 🔹 Jelszó validálása: legalább 6 karakter, egy nagy betű és egy szám
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long and contain at least one uppercase letter and one number.");
      return;
    }

    const salt = generateSalt(); // Generálunk egy véletlenszerű sót
    const hashedPassword = hashPassword(password, salt); // Jelszót hash-elünk a sóval együtt

    const user = {
      Name: username,
      Email: email,
      Hash: hashedPassword, // Hashelt jelszó
      Salt: salt, // Só elküldése
      Gender: gender,
    };

    try {
      const response = await axios.post("http://localhost:5071/Registry", user, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error);

      const errorData = error.response?.data?.errors;
      if (errorData) {
        const messages = Object.values(errorData).flat().join(" ");
        setErrorMessage(messages);
      } else {
        setErrorMessage(error.response?.data?.title || "Registration failed");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="registry-container">
      <div className="registry-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"} // A jelszó típusának váltása
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
          </div>
          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-container">
              <input
                type={confirmPasswordVisible ? "text" : "password"} // A megerősítő jelszó típusának váltása
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
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
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <p className="auth-link">
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistryForm;
