
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>BMI Calculator</h1>
      <p>Calculate your Body Mass Index easily.</p>
      <button onClick={() => navigate("/bmi")}>
        Get Started
      </button>
    </div>
  );
}

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calculateBMI = (e) => {
    e.preventDefault();

    const h = Number(height);
    const w = Number(weight);

    if (!height || !weight || h <= 0 || w <= 0) {
      setError("Please enter valid height and weight.");
      return;
    }

    if (h > 300 || w > 500) {
      setError("Please enter realistic values.");
      return;
    }

    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);

    navigate("/result", {
      state: { bmi: bmi.toFixed(2), height: h, weight: w }
    });
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>

      <form onSubmit={calculateBMI}>
        <label>Height (cm)</label>
        <input
          type="number"
          placeholder="Enter height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label>Weight (kg)</label>
        <input
          type="number"
          placeholder="Enter weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Calculate BMI</button>
      </form>
    </div>
  );
}

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  if (!data) {
    return (
      <div className="container">
        <h2>No BMI data found</h2>
        <button onClick={() => navigate("/bmi")}>
          Go to Calculator
        </button>
      </div>
    );
  }

  const bmi = Number(data.bmi);

  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal Weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return (
    <div className="container">
      <h1>Your BMI Result</h1>

      <h2>{data.bmi}</h2>

      <h3>Category: {category}</h3>

      <p>Height: {data.height} cm</p>
      <p>Weight: {data.weight} kg</p>

      <button onClick={() => navigate("/bmi")}>
        Calculate Again
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
