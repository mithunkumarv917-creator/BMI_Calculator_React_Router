# Ex06 BMI Calculator
## Date: 24-11-2026

## AIM
To develop a responsive and interactive Body Mass Index (BMI) Calculator using React that allows users to input their height and weight, and calculates their BMI to categorize their health status (e.g., Underweight, Normal, Overweight, Obese).

## DESIGN STEPS

### STEP 1: Initialize React Project

<li>Create a new React app using create-react-app.</li>
<li>Install React Router using:</li>
npm install react-router-dom

### STEP 2: Set Up Routing

Create routing structure with react-router-dom:

<li>Home route (/) – Intro or Navigation</li>

<li>BMI Calculator route (/bmi)</li>

<li>Result route (/result)</li>

### STEP 3: Design the BMI Form Page

<li>Create a form to accept Height (in cm or m) and Weight (in kg).</li>

<li>On form submit, navigate to the result page with entered values via URL query params or context/state.</li>

## STEP 4: Handle Input Validation

<li>Check if height and weight are valid numbers.</li>

<li>Optionally, show error messages for invalid inputs.</li>

### STEP 5: Perform BMI Calculation

<li>In the result component:

<li>Extract height and weight from the route (URL or passed state).</li>

<li>Apply the BMI formula:</li>

![image](https://github.com/user-attachments/assets/ec785506-c96b-489e-8783-fb1a5d36101a)
​
 
<li>Convert height from cm to m if needed.</li></li>

### STEP 6: Display Result

<li>Show calculated BMI.</li>

<li>Show category based on BMI range:

<li>Underweight, Normal, Overweight, Obese, etc.</li></li>

### STEP 7: Navigation Options

<li>Provide a button to go back to the BMI form to calculate again.</li>

### STEP 8: Enhancements

<li>Add styling using CSS or Tailwind.</li>

## PROGRAM
```
App.jsx

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

App.css

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #74ebd5, #9face6);
  min-height: 100vh;
}

.container {
  width: 90%;
  max-width: 420px;
  margin: 100px auto;
  padding: 35px;
  background: white;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

h2 {
  font-size: 45px;
  color: #4b65c7;
  margin: 20px;
}

h3 {
  color: #16a085;
  margin-bottom: 20px;
}

p {
  margin: 15px 0;
  color: #555;
}

form {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin: 12px 0 5px;
  font-weight: bold;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 13px;
  margin-top: 20px;
  background: #536dfe;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #354ac7;
}

.error {
  color: red;
  font-size: 14px;
}

@media (max-width: 480px) {
  .container {
    margin: 60px auto;
    padding: 25px;
  }
}


```



## OUTPUT

![alt text](<Screenshot 2026-11-24 161440.png>) 
![alt text](<Screenshot 2026-11-24 161504.png>) 
![alt text](<Screenshot 2026-11-24 161513.png>)


## RESULT
The BMI Calculator successfully takes user input for height and weight, performs the BMI calculation in real-time using React state and event handling, and displays the BMI value along with the corresponding health category.