import { useState, useEffect } from "react"
import "./Calorie.css"
import axios from "axios"

export default function Calorie() {
  // Állapotok az űrlap mezőkhöz
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [activityLevel, setActivityLevel] = useState(1.55)
  const [weightLossGoal, setWeightLossGoal] = useState(0.5)

  // Kalkulált kalóriaértékek (karbantartás, fogyás, tömegnövelés, BMR)
  const [calories, setCalories] = useState({
    maintenance: "",
    weightLoss: "",
    bulk: "",
    bmr: "",
  })

  // Kiválasztott kalória érték mentéshez
  const [selectedCalorie, setSelectedCalorie] = useState(null)

  // Üzenetek megjelenítéséhez (siker/hiba)
  const [message, setMessage] = useState("")

  // Be van-e jelentkezve a felhasználó
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Felhasználó azonosítója
  const [userId, setUserId] = useState(null)

  // Oldal betöltésekor ellenőrizzük, hogy be van-e jelentkezve, és betöltjük az alap adatokat
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user && user.token) {
      // Lekérjük a felhasználó adatait token alapján
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/User/?token=${user.token}`)
        .then((response) => {
          console.log("User Data:", response.data)
          setUserId(response.data.id)
          setWeight(response.data.weight || "")
          setHeight(response.data.height || "")
          setAge(response.data.age || "")
          setGender(response.data.gender || "male")
          setIsLoggedIn(true)
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
          setIsLoggedIn(false)
        })
    } else {
      setIsLoggedIn(false)
      console.log("User is not logged in or token is missing.")
    }
  }, [])

  // BMR (alapanyagcsere) számítása Mifflin-St Jeor képlet alapján
  const calculateBMR = () => {
    if (gender === "male") {
      return 88.36 + 13.4 * Number(weight) + 4.8 * Number(height) - 5.7 * Number(age)
    } else {
      return 447.6 + 9.2 * Number(weight) + 3.1 * Number(height) - 4.3 * Number(age)
    }
  }

  // Kalóriaigények kiszámítása aktivitás és cél alapján
  const calculateCalories = () => {
    const bmr = calculateBMR()
    const maintenanceCalories = bmr * activityLevel
    const deficit = weightLossGoal * 1000 // kb. 1000 kcal = 1 kg/hét

    setCalories({
      maintenance: Math.round(maintenanceCalories),
      weightLoss: Math.round(maintenanceCalories - deficit),
      bulk: Math.round(maintenanceCalories + 500),
      bmr: Math.round(bmr),
    })
  }

  // Kiválasztott kalória érték mentése adatbázisba
  const saveCalorie = () => {
    if (!isLoggedIn) {
      setMessage("Please log in to save your calorie count.")
      return
    }

    if (selectedCalorie === null) {
      setMessage("Please select a calorie option to save.")
      return
    }

    const data = {
      UserId: userId,
      CalorieCount: selectedCalorie,
      Date: new Date().toISOString(), // mentés időpontja
    }

    console.log("Sending data:", data)

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/Calorie/`, data)
      .then((response) => {
        setMessage("Calorie successfully saved!")
      })
      .catch((error) => {
        setMessage("Error saving calorie.")
        console.error(error)
      })
  }

  // JSX visszatérés: űrlap baloldalt, eredmények jobboldalt
  return (
    <div className="calculator-bg">
      <div className="container py-4 px-3 px-md-4">
        <h1 className="mb-4 t-30">Calorie Calculator</h1>

        <div className="row">
          {/* Bemeneti mezők (testsúly, magasság, stb.) */}
          <div className="col-md-6">
            <div className="form-container">
              <h2 className="h2 mb-4">Input Data</h2>

              {/* Testsúly */}
              <div className="form-row">
                <label className="form-label">Weight (kg):</label>
                <input
                  type="number"
                  className="form-control-sm"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {/* Testmagasság */}
              <div className="form-row">
                <label className="form-label">Height (cm):</label>
                <input
                  type="number"
                  className="form-control-sm"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              {/* Életkor */}
              <div className="form-row">
                <label className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control-sm"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Nem választó */}
              <div className="form-row">
                <label className="form-label">Gender:</label>
                <select className="form-select-sm" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Aktivitási szint */}
              <div className="form-row">
                <label className="form-label">Activity Level:</label>
                <select
                  className="form-select-sm"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(Number.parseFloat(e.target.value))}
                >
                  <option value={1.2}>Sedentary</option>
                  <option value={1.375}>Lightly active</option>
                  <option value={1.55}>Moderately active</option>
                  <option value={1.725}>Very active</option>
                  <option value={1.9}>Super active</option>
                </select>
              </div>

              {/* Heti fogyási cél (deficit) */}
              <div className="form-row">
                <label className="form-label">Weekly Goal (kg):</label>
                <select
                  className="form-select-sm"
                  value={weightLossGoal}
                  onChange={(e) => setWeightLossGoal(Number.parseFloat(e.target.value))}
                >
                  <option value={0.5}>0.5 kg</option>
                  <option value={1}>1 kg</option>
                  <option value={1.5}>1.5 kg</option>
                </select>
              </div>

              {/* Számítás gomb */}
              <div className="form-row">
                <label className="form-label"></label>
                <button type="button" className="btn btn-primary" onClick={calculateCalories}>
                  Calculate Calories
                </button>
              </div>
            </div>
          </div>

          {/* Jobb oldalon az eredmények jelennek meg */}
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="form-container">
              <h2 className="h2 mb-4">Results</h2>

              {/* Eredmények listázása */}
              {Object.entries(calories).map(([key, value]) => (
                <div className="form-row" key={key}>
                  <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                  <div className="result-value-container">
                    <input type="text" className="result-input" value={value} readOnly />
                    {/* BMR nem választható, a többi igen */}
                    {key !== "bmr" && (
                      <input
                        type="checkbox"
                        className="result-checkbox"
                        checked={selectedCalorie === value}
                        onChange={() => setSelectedCalorie(value)}
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Mentés gomb */}
              <div className="form-row">
                <label className="form-label"></label>
                <button className="btn btn-success" onClick={saveCalorie}>
                  Save
                </button>
              </div>

              {/* Üzenet megjelenítése */}
              {message && (
                <div className={`message ${message.includes("successfully") ? "text-success" : "text-danger"}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
