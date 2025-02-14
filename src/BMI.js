import React, { useState } from 'react'

export default function BMI() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState("");
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    // Ellenőrizzük, hogy a magasság és súly pozitív számok legyenek
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setResult(`Your BMI is ${bmi}`);

      // Kategorizálás a BMI alapján
      if (bmi < 18.5) {
        setCategory("Underweight");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setCategory("Normal weight");
      } else if (bmi >= 25 && bmi <= 29.9) {
        setCategory("Overweight");
      } else {
        setCategory("Obesity");
      }
    } else {
      setResult("Please enter valid height and weight values.");
      setCategory("");  // Töröljük a kategóriát, ha érvénytelen adatot adtak meg
    }
  }

  const clearFields = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
    setResult("");
    setCategory("");  // Töröljük a kategóriát
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
      </div>
    </main>
  );
}
