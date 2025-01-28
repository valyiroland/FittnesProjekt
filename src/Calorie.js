import React, { useState } from 'react';

export default function Calorie() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(1.55);
  const [weightLossGoal, setWeightLossGoal] = useState(0.5);
  const [calories, setCalories] = useState({
    maintenance: '',
    weightLoss: '',
    bulk: '',
    bmr: ''
  });

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
    const deficit = weightLossGoal * 1000;

    setCalories({
      maintenance: Math.round(maintenanceCalories),
      weightLoss: Math.round(maintenanceCalories - deficit),
      bulk: Math.round(maintenanceCalories + 500),
      bmr: Math.round(bmr)
    });
  };

  return (
    <div className= "mainStyle container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-6">
          <h1 className="text-center mb-4">Calorie Calculator</h1>
          <form>
            <div className="mb-3">
              <label className="form-label">Weight (kg):</label>
              <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Height (cm):</label>
              <input type="number" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Activity Level:</label>
              <select className="form-select" value={activityLevel} onChange={(e) => setActivityLevel(parseFloat(e.target.value))}>
                <option value={1.2}>Sedentary</option>
                <option value={1.375}>Lightly active</option>
                <option value={1.55}>Moderately active</option>
                <option value={1.725}>Very active</option>
                <option value={1.9}>Super active</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Weekly Weight Loss Goal (kg):</label>
              <select className="form-select" value={weightLossGoal} onChange={(e) => setWeightLossGoal(parseFloat(e.target.value))}>
                <option value={0.5}>0.5 kg</option>
                <option value={1}>1 kg</option>
                <option value={1.5}>1.5 kg</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={calculateCalories}>Calculate Calories</button>
          </form>
        </div>

        {/* Results aligned properly */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center mb-4">Results</h2>
          <div className="row w-100">
            <div className="col-md-3 mb-3">
              <label className="form-label">BMR:</label>
              <input type="text" className="form-control" value={calories.bmr} readOnly />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Weight Maintenance:</label>
              <input type="text" className="form-control" value={calories.maintenance} readOnly />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Weight Loss:</label>
              <input type="text" className="form-control" value={calories.weightLoss} readOnly />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Bulk:</label>
              <input type="text" className="form-control" value={calories.bulk} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
