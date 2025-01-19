import React, { useState } from 'react';

export default function Calorie() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [calories, setCalories] = useState({
    maintenance: '',
    weightLoss: '',
    bulk: '',
    bmr: ''
  });

  // BMR calculation function for males and females
  const calculateBMR = () => {
    if (gender === 'male') {
      return 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
      return 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }
  };

  const calculateCalories = () => {
    const bmr = calculateBMR();
    const maintenanceCalories = bmr * activityLevel;

    // Set the calorie values for each goal
    setCalories({
      maintenance: Math.round(maintenanceCalories),
      weightLoss: Math.round(maintenanceCalories - 500), // 500 kcal deficit for weight loss
      bulk: Math.round(maintenanceCalories + 500), // 500 kcal surplus for bulk
      bmr: Math.round(bmr) // Display the BMR value
    });
  };

  return (
    <div className="container" style={{ marginTop: '10%' }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5">
          <h1 className="text-center mb-4">Calorie Calculator</h1>
          <form>
            <div className="mb-3">
              <label className="form-label">Weight (kg): </label>
              <input
                type="number"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Height (cm): </label>
              <input
                type="number"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age: </label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender: </label>
              <select
                className="form-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Activity Level: </label>
              <select
                className="form-select"
                value={activityLevel}
                onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
              >
                <option value={1.2}>Sedentary (little or no exercise)</option>
                <option value={1.375}>Lightly active (light exercise/sports 1-3 days/week)</option>
                <option value={1.55}>Moderately active (moderate exercise/sports 3-5 days/week)</option>
                <option value={1.725}>Very active (hard exercise/sports 6-7 days a week)</option>
                <option value={1.9}>Super active (very hard exercise/physical job or 2x training)</option>
              </select>
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary w-100" onClick={calculateCalories}>
                Calculate Calories
              </button>
            </div>
          </form>
        </div>

        {/* Right side for results */}
        <div className="col-md-5 mt-4"> {/* Margin-top added here to create space */}
          <h2 className="text-center mb-4">Results</h2>
          <div className="mb-3">
            <label className="form-label">BMR: </label>
            <input
              type="text"
              className="form-control"
              value={calories.bmr}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Weight Maintenance: </label>
            <input
              type="text"
              className="form-control"
              value={calories.maintenance}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Weight Loss: </label>
            <input
              type="text"
              className="form-control"
              value={calories.weightLoss}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bulk: </label>
            <input
              type="text"
              className="form-control"
              value={calories.bulk}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
