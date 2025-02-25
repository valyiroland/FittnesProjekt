import { useState, useEffect } from "react";
import './Calorie.css';
import axios from "axios";

export default function Calorie() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [weightLossGoal, setWeightLossGoal] = useState(0.5);
  const [calories, setCalories] = useState({
    maintenance: "",
    weightLoss: "",
    bulk: "",
    bmr: "",
  });
  const [selectedCalorie, setSelectedCalorie] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.token) {
      axios.get(`http://localhost:5071/api/User/?token=${user.token}`)
        .then(response => {
          console.log("User Data:", response.data);
          setUserId(response.data.id);
          setWeight(response.data.weight || "");
          setHeight(response.data.height || "");
          setAge(response.data.age || "");
          setGender(response.data.gender || "male");
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
      console.log("User is not logged in or token is missing.");
    }
  }, []);

  const calculateBMR = () => {
    if (gender === "male") {
      return 88.36 + 13.4 * Number(weight) + 4.8 * Number(height) - 5.7 * Number(age);
    } else {
      return 447.6 + 9.2 * Number(weight) + 3.1 * Number(height) - 4.3 * Number(age);
    }
  };

  const calculateCalories = () => {
    const bmr = calculateBMR();
    const maintenanceCalories = bmr * activityLevel;
    const deficit = weightLossGoal * 1000;

    setCalories({
      maintenance: Math.round(maintenanceCalories),
      weightLoss: Math.round(maintenanceCalories - deficit),
      bulk: Math.round(maintenanceCalories + 500),
      bmr: Math.round(bmr),
    });
  };

  const saveCalorie = () => {
    if (!isLoggedIn) {
      setMessage("Please log in to save your calorie count.");
      return;
    }

    if (selectedCalorie === null) {
      setMessage("Please select a calorie option to save.");
      return;
    }

    const data = {
      UserId: userId,  
      CalorieCount: selectedCalorie,
      Date: new Date().toISOString(), 
    };

    console.log("Sending data:", data);

    axios.post("http://localhost:5071/api/Calorie/", data)
      .then(response => {
        setMessage("Calorie successfully saved!");
      })
      .catch(error => {
        setMessage("Error saving calorie.");
        console.error(error);
      });
  };

  return (
    <div className="calculator-bg">
      <div className="container py-4 px-3 px-md-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row">
              <div className="col-md-6">
                <h1 className="mb-4 t-30">Calorie Calculator</h1>
                <div className="mb-2">
                  <label className="form-label">Weight (kg):</label>
                  <input type="number" className="form-control-sm" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Height (cm):</label>
                  <input type="number" className="form-control-sm" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Age:</label>
                  <input type="number" className="form-control-sm" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Gender:</label>
                  <select className="form-select-sm" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Activity Level:</label>
                  <select className="form-select-sm" value={activityLevel} onChange={(e) => setActivityLevel(Number.parseFloat(e.target.value))}>
                    <option value={1.2}>Sedentary</option>
                    <option value={1.375}>Lightly active</option>
                    <option value={1.55}>Moderately active</option>
                    <option value={1.725}>Very active</option>
                    <option value={1.9}>Super active</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Weekly Weight Loss Goal (kg):</label>
                  <select className="form-select-sm" value={weightLossGoal} onChange={(e) => setWeightLossGoal(Number.parseFloat(e.target.value))}>
                    <option value={0.5}>0.5 kg</option>
                    <option value={1}>1 kg</option>
                    <option value={1.5}>1.5 kg</option>
                  </select>
                </div>
                <div className="mb-2">
                  <button type="button" className="btn btn-primary w-100" onClick={calculateCalories}>
                    Calculate Calories
                  </button>
                </div>
              </div>
              <div className="col-md-6 mt-4 mt-md-0">
                <h2 className="h2 mb-4">Results</h2>
                <div className="results-container">
                  {Object.entries(calories).map(([key, value]) => (
                    <div className="result-item" key={key}>
                      <span className="result-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                      <input type="text" className="result-input" value={value} readOnly />
                      {key !== "bmr" && (
                        <input type="checkbox" checked={selectedCalorie === value} onChange={() => setSelectedCalorie(value)} />
                      )}
                    </div>
                  ))}
                </div>
                <button className="btn btn-success w-100 mt-3" onClick={saveCalorie}>Save</button>
                {message && <div className={`mt-2 ${message.includes("successfully") ? "text-success" : "text-danger"}`}>{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
