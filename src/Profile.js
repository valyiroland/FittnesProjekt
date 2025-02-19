import { useEffect, useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faWeight, faRulerVertical, faCalculator, faFire } from "@fortawesome/free-solid-svg-icons"

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.token) {
      setError("User not logged in.")
      return
    }

    console.log("Stored user data:", user)
    console.log("Using token:", user.token)

    axios
      .get(`http://localhost:5071/api/User/?token=${user.token}`)
      .then((response) => {
        console.log("API response:", response.data)
        setUserData(response.data)
      })
      .catch((err) => {
        setError(err.response?.data || "Error fetching data.")
      })
  }, [])

  return (
    <div className="container py-5 mt-5">
    
      {error && <p className="alert alert-danger">{error}</p>}
      {userData ? (
        <div className="card shadow">
          <div className="card-header bg-primary text-white d-flex align-items-center py-3">
            <FontAwesomeIcon icon={faUser} size="2x" className="me-3" />
            <div>
              <h3 className="mb-0">{userData.name || "N/A"}</h3>
              <p className="mb-0 small">{userData.email || "N/A"}</p>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faWeight} className="me-2" />
                  Weight
                </h6>
                <p className="h5">{userData.weight ? `${userData.weight} kg` : "N/A"}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faRulerVertical} className="me-2" />
                  Height
                </h6>
                <p className="h5">{userData.height ? `${userData.height} cm` : "N/A"}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faCalculator} className="me-2" />
                  BMI
                </h6>
                <p className="h5">{userData.bmiValue || "N/A"}</p>
              </div>
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faFire} className="me-2" />
                  Calorie Intake
                </h6>
                <p className="h5">{userData.calorieCount ? `${userData.calorieCount} kcal` : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile