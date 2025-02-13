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
            <option value="" disabled>
              Select your gender
            </option>
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <p style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistryForm;
