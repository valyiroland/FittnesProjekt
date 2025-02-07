import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Login függvény
  const handleLogin = async (e) => {
    e.preventDefault(); // Az alapértelmezett form-elküldést blokkoljuk
    try {
      // 🔹 Lekérjük a salt értéket
      const saltResponse = await axios.post(
        `http://localhost:5071/api/Login/GetSalt/${username}`
      );
      const salt = saltResponse.data;

      // 🔹 SHA-256 hash generálás
      const encoder = new TextEncoder();
      const data = encoder.encode(password + salt);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      // 🔹 Login kérés a backendhez
      const loginResponse = await axios.post("http://localhost:5071/api/Login", {
        LoginName: username,
        TmpHash: hashHex,
      });

      const userData = loginResponse.data; // Backend válasza
      localStorage.setItem("user", JSON.stringify(userData)); // 🔹 Adatok mentése localStorage-ba

      setError(""); // Hibák törlése
      alert("Sikeres bejelentkezés!");
      navigate("/", { replace: true }); // 🔹 Átirányítás és újratöltés
      window.location.reload(); // 🔹 Oldal frissítése a főoldalon
    } catch (err) {
      setError(err.response?.data || "Hiba történt a bejelentkezés során");
    }
  };

  return (
    <div className="content">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>
          Don’t have an account? <Link to="/Registration">Create one</Link>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
