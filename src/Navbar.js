import React, { use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Navbar.css';

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // 🔹 Ellenőrizzük, hogy be van-e jelentkezve a felhasználó
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name);
      setToken(user.token)
    }
  }, []);

  // 🔹 Kijelentkezési függvény (Token küldése query paraméterként)
  const handleLogout = async () => {
    try {
      const storedUser = localStorage.getItem("token");
      console.log(token)
      if (!token) return;
      
      await axios.post(`http://localhost:5071/api/LogOut?uId=${token}`);

      localStorage.removeItem("user"); // 🔹 Felhasználói adatok törlése
      localStorage.removeItem("token"); // 🔹 Token törlése
      setUsername(null);
      navigate("/Login"); // 🔹 Átirányítás a bejelentkezéshez
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img id="navbarlogo" src="navbarlogo.png" alt="Logo" />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/BMI">BMI</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Calorie">Calorie</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/Diet">Diet</Link>
              </li>
            </ul>
          </div>

          <div className="user-icons">
            {username ? (
              <>
                <span className="nav-username">Hello, {username}!</span>
                <button className="logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </>
            ) : (
              <Link to="/Login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
            <Link to="/Info">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
