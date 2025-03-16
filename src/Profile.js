import { useEffect, useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faWeight, faRulerVertical, faCalculator, faFire, faTrash } from "@fortawesome/free-solid-svg-icons"

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [noDataToDelete, setNoDataToDelete] = useState(false)

  const fetchUserData = () => {
    setIsLoading(true)
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.token) {
      setError("User not logged in.")
      setIsLoading(false)
      return
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/User/?token=${user.token}`)
      .then((response) => {
        console.log("API response:", response.data)
        setUserData(response.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data || "Error fetching data.")
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleDeleteData = () => {
  
    const hasData =
      userData &&
      ((userData.weight && userData.weight.length > 0) ||
        (userData.height && userData.height.length > 0) ||
        (userData.bmiValue && userData.bmiValue.length > 0) ||
        (userData.calorieCount && userData.calorieCount.length > 0))

    if (!hasData) {
      setNoDataToDelete(true)
      setTimeout(() => setNoDataToDelete(false), 3000) 
      return
    }

    setShowConfirmation(true)
  }

  const confirmDelete = () => {
    if (!userData) return

    setIsLoading(true)
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/User/DeleteUserData?userId=${userData.id}`)
      .then(() => {
        setShowConfirmation(false)
        fetchUserData()
      })
      .catch((err) => {
        setError(err.response?.data || "Error deleting data.")
        setIsLoading(false)
      })
  }

  const cancelDelete = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="container py-5 mt-5">
      {error && <p className="alert alert-danger">{error}</p>}
      {noDataToDelete && (
        <div className="alert alert-info alert-dismissible fade show">
          No data available to delete.
          <button type="button" className="btn-close" onClick={() => setNoDataToDelete(false)}></button>
        </div>
      )}
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : userData ? (
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
                <p className="h5">
                  {userData.weight && userData.weight.length > 0
                    ? `${userData.weight[userData.weight.length - 1]} kg`
                    : "N/A"}
                </p>
              </div>
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faRulerVertical} className="me-2" />
                  Height
                </h6>
                <p className="h5">
                  {userData.height && userData.height.length > 0
                    ? `${userData.height[userData.height.length - 1]} cm`
                    : "N/A"}
                </p>
              </div>
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faCalculator} className="me-2" />
                  BMI
                </h6>
                <p className="h5">
                  {userData.bmiValue && userData.bmiValue.length > 0
                    ? userData.bmiValue[userData.bmiValue.length - 1]
                    : "N/A"}
                </p>
              </div>
              <div className="col-sm-6 mb-3">
                <h6 className="text-muted">
                  <FontAwesomeIcon icon={faFire} className="me-2" />
                  Calorie Intake
                </h6>
                <p className="h5">
                  {userData.calorieCount && userData.calorieCount.length > 0
                    ? `${userData.calorieCount[userData.calorieCount.length - 1]} kcal`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
              <button className="btn btn-warning" onClick={handleDeleteData}>
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Delete Data
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">No user data available.</div>
      )}

      {showConfirmation && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h5 className="modal-title">Confirm Data Deletion</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete all your BMI and calorie data? This action cannot be undone.</p>
                <p>
                  <strong>Note:</strong> Your user account will remain, only the data will be deleted.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-warning" onClick={confirmDelete}>
                  Delete Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

