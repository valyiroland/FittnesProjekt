import React, { useState } from 'react'

export default function BMI() {

    const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [result, setResult] = useState("");

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setResult(`Your BMI is ${bmi}`);
    } else {
      setResult("Please enter valid height and weight values.");
    }
  };

  const clearFields = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setGender("");
    setResult("");
  };

  return (
    
    <main>
      
        <h1 className='mainStyle'>BMI Calculator</h1>
        <div className="form-container">
          <label>
            Age
            <input
              type="number"
              placeholder="2-120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label>
            Height (cm)
            <input
              type="number"
              placeholder="cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
          <label>
            Weight (kg)
            <input
              type="number"
              placeholder="kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
          <label>
            Gender
            <div className="gender-container">
              <label id="gender-label">
                <input id="radio-btn-gender"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label id="gender-label">
                <input id="radio-btn-gender"
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
        </div>
      </main>
  )
}
