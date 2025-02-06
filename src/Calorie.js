import { useState } from "react"

export default function Calorie() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [activityLevel, setActivityLevel] = useState(1.55)
  const [weightLossGoal, setWeightLossGoal] = useState(0.5)
  const [calories, setCalories] = useState({
    maintenance: "",
    weightLoss: "",
    bulk: "",
    bmr: "",
  })

  const calculateBMR = () => {
    if (gender === "male") {
      return 88.36 + 13.4 * Number(weight) + 4.8 * Number(height) - 5.7 * Number(age)
    } else {
      return 447.6 + 9.2 * Number(weight) + 3.1 * Number(height) - 4.3 * Number(age)
    }
  }

  const calculateCalories = () => {
    const bmr = calculateBMR()
    const maintenanceCalories = bmr * activityLevel
    const deficit = weightLossGoal * 1000

    setCalories({
      maintenance: Math.round(maintenanceCalories),
      weightLoss: Math.round(maintenanceCalories - deficit),
      bulk: Math.round(maintenanceCalories + 500),
      bmr: Math.round(bmr),
    })
  }

  return (
    <div className="calculator-bg">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row">
              {/* Left Column - Calculator */}
              <div className="col-md-6">
                <h1 className="h2 mb-4">Calorie Calculator</h1>
                <div className="mb-2">
                  <label className="form-label">Weight (kg):</label>
                  <input
                    type="number"
                    className="form-control-sm"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Height (cm):</label>
                  <input
                    type="number"
                    className="form-control-sm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Age:</label>
                  <input
                    type="number"
                    className="form-control-sm"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
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

                <div className="mb-2">
                  <label className="form-label">Weekly Weight Loss Goal (kg):</label>
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

                <div className="mb-2">
                  <button type="button" className="btn btn-primary w-100" onClick={calculateCalories}>
                    Calculate Calories
                  </button>
                </div>
              </div>

              {/* Right Column - Results */}
              <div className="col-md-6">
                <h2 className="h2 mb-4">Results</h2>
                <div className="row">
                  <div className="col-12 mb-2">
                    <div className="d-flex justify-content-between">
                      <div style={{ width: "23%" }}>
                        <div className="form-label text-nowrap">BMR:</div>
                        <input type="text" className="form-control-sm w-100" value={calories.bmr} readOnly />
                      </div>
                      <div style={{ width: "23%" }}>
                        <div className="form-label text-nowrap">Weight Maint.:</div>
                        <input type="text" className="form-control-sm w-100" value={calories.maintenance} readOnly />
                      </div>
                      <div style={{ width: "23%" }}>
                        <div className="form-label text-nowrap">Weight Loss:</div>
                        <input type="text" className="form-control-sm w-100" value={calories.weightLoss} readOnly />
                      </div>
                      <div style={{ width: "23%" }}>
                        <div className="form-label text-nowrap">Bulk:</div>
                        <input type="text" className="form-control-sm w-100" value={calories.bulk} readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}