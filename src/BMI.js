import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BMI() {
  const [userId, setUserId] = useState(null);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState("");
  const [category, setCategory] = useState("");
  const [responseMessage, setResponseMessage] = useState("");  

  // 🔹 Bejelentkezett felhasználó ID lekérése
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("❌ There is no logged-in user!");
          return;
        }

        const userData = JSON.parse(storedUser); // 🔹 JSON parse
        const token = userData.token; // 🔹 Token kinyerése

        if (!token) {
          console.error("❌ There is no token in the user data!");
          return;
        }

        const response = await axios.get(`http://localhost:5071/api/User?token=${token}`);

        if (response.data && response.data.id) {
          setUserId(response.data.id);
        } else {
          console.error("❌ Failed to retrieve user data.");
        }
      } catch (error) {
        console.error("❌ An error occurred while retrieving user data:", error);
      }
    };

    fetchUserId();
  }, []);

  const calculateBMI = async () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setResult(`Your BMI is ${bmi}`);

      if (bmi < 18.5) {
        setCategory("Underweight");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setCategory("Normal weight");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setCategory("Overweight");
      } else {
        setCategory("Obesity");
      }

      // 🔹 Ha nincs bejelentkezett felhasználó, ne mentse el az adatokat
      if (!userId) {
        setResponseMessage("⚠️ Not logged in: BMI not saved, but calculated.");
        return;
      }

      try {
        const bmiData = {
          userId: userId,
          height: parseInt(height, 10),
          weight: parseFloat(weight),
          bmiValue: parseFloat(bmi),
        };

        console.log("📤 Küldött adatok:", bmiData);

        const response = await axios.post('http://localhost:5071/api/Bmi', bmiData, {
          headers: { 'Content-Type': 'application/json' },
        });

        console.log('✅ BMI data saved successfully', response.data);
        setResponseMessage("✅ BMI data saved successfully.");
      } catch (error) {
        console.error('❌ Error saving BMI data', error.response ? error.response.data : error.message);
        setResponseMessage("❌ Error saving BMI data: " + (error.response ? error.response.data : error.message));
      }
    } else {
      setResult("⚠️ Please enter valid height and weight values.");
      setCategory("");
    }
  };

  const clearFields = () => {
    setHeight("");
    setWeight("");
    setGender("");
    setResult("");
    setCategory("");  
    setResponseMessage("");  
  };

  return (
    <main className="container py-4 px-3 px-md-4">
      <h1 className="mainStyle">BMI Calculator</h1>
      <div className="form-container mx-auto" style={{ maxWidth: "400px" }}>
        <label>
          Height (cm)
          <input
            type="number"
            placeholder="cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="0"
          />
        </label>
        <label>
          Weight (kg)
          <input
            type="number"
            placeholder="kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
          />
        </label>
        <label>
          Gender
          <div className="gender-container">
            <label id="gender-label">
              <input
                id="radio-btn-gender"
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label id="gender-label">
              <input
                id="radio-btn-gender"
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>
        </label>
        <div className="button-container">
          <button className="calculate-btn" onClick={calculateBMI}>
            Calculate
          </button>
          <button className="clear-btn" onClick={clearFields}>
            Clear
          </button>
        </div>
        <div className="result">
          <strong>Result:</strong> {result}
        </div>
        {category && (
          <div className="category">
            <strong>Category:</strong> {category}
          </div>
        )}
        {responseMessage && (
          <div className="response-message">
            <strong>{responseMessage}</strong>
          </div>
        )}
      </div>
    </main>
  );
}
