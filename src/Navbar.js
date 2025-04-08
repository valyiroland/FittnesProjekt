import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faInfoCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Navbar.css"

export default function Navbar() {
  // Az aktuális felhasználó nevét és a token-t tároló állapotok
  const [username, setUsername] = useState(null)
  const [token, setToken] = useState(null)
  
  // A navigációs hook, hogy a logout után átirányítsuk a bejelentkezési oldalra
  const navigate = useNavigate()

  useEffect(() => {
    // A localStorage-ból próbáljuk lekérni a felhasználó adatokat (név és token)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUsername(user.name) // Felhasználó neve
      setToken(user.token)    // Felhasználói token
    }
  }, []) // Csak egyszer fut le, amikor a komponens betöltődik

  // Kilépési függvény
  const handleLogout = async () => {
    try {
      // Ha nincs token, nem szükséges kilépni
      if (!token) return

      // Kilépés a backend API-val
      await axios.post(`${process.env.REACT_APP_API_URL}/api/LogOut?uId=${token}`)
      
      // Töröljük a localStorage-ban tárolt adatokat
      localStorage.removeItem("user")
      localStorage.removeItem("token")

      // Reseteljük a felhasználói adatokat
      setUsername(null)
      
      // Navigálás a bejelentkezési oldalra
      navigate("/Login")
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message)
    }
  }

  return (
    <nav className="navbar navbar-light fixed-top">
      <div className="container">
        {/* Mobil és tablet nézet (1000px alatt) */}
        <div className="mobile-tablet-view">
          <Link className="navbar-brand" to="/">
            <img id="navbarlogo" src="/navbarlogo.png" alt="Logo" />
          </Link>

          <div className="nav-icons">
            {/* Ha van bejelentkezett felhasználó */}
            {username ? (
              <>
                <span className="nav-username">Hello, {username}!</span>
                <button className="logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </>
            ) : (
              // Ha nincs bejelentkezett felhasználó, akkor link a bejelentkezéshez
              <Link to="/Login" className="nav-icon-link" aria-label="Bejelentkezés">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
            <Link to="/Profile" className="nav-icon-link" aria-label="Információ">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </div>
        </div>

        {/* Desktop nézet (1000px felett) */}
        <div className="desktop-view">
          <Link className="navbar-brand" to="/">
            <img id="navbarlogo" src="/navbarlogo.png" alt="Logo" />
          </Link>

          <div className="desktop-nav">
            {/* Navigációs linkek a desktop verzióhoz */}
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/BMI">BMI</Link>
            <Link className="nav-link" to="/Calorie">Calorie</Link>
            {/* Ha van bejelentkezett felhasználó, akkor megjelenik a Diet link */}
            {username ? (
              <Link className="nav-link" to="/Diet">Diet</Link>
            ) : (
              <span className="nav-link disabled">Diet</span> // Ha nincs bejelentkezve, letiltott a link
            )}
          </div>

          <div className="user-section">
            {/* Ha van bejelentkezett felhasználó */}
            {username ? (
              <>
                <span className="nav-username">Hello, {username}!</span>
                <button className="logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </>
            ) : (
              // Ha nincs bejelentkezve, akkor login link
              <Link to="/Login" className="login-link">
                <FontAwesomeIcon icon={faUser} /> Login
              </Link>
            )}
            <Link to="/Profile" className="info-link">
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
