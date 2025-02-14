import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError("The password must be 6 character long at least and must contain a capital and a numerical character!");
      return;
    }

    try {
     
      const saltResponse = await axios.post(
        `http://localhost:5071/api/Login/GetSalt/${username}`
      );
      const salt = saltResponse.data;


      const encoder = new TextEncoder();
      const data = encoder.encode(password + salt);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");


      const loginResponse = await axios.post("http://localhost:5071/api/Login", {
        LoginName: username,
        TmpHash: hashHex,
      });

      const userData = loginResponse.data;
      localStorage.setItem("user", JSON.stringify(userData));

      setError("");
      alert("Successfull login!");
      navigate("/", { replace: true });
      window.location.reload();
    } catch (err) {
      setError(err.response?.data || "There was an error during the login.");
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
              required
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
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="auth-link">
          Don’t have an account? <Link to="/Registration">Create one</Link>
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;