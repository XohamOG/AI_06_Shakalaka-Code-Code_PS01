import React from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* 3D Spline Background */}
      <Spline
        scene="https://prod.spline.design/MZm4MqttnZzYraVm/scene.splinecode"
        className="spline-scene"
      />

      <div className="overlay">
        <h1>Welcome to Emotion Viewer</h1>
        <p>Select your role:</p>
        <div className="buttons">
          <button className="btn employer" onClick={() => navigate("/employer")}>
            Employer
          </button>
          <button className="btn customer" onClick={() => navigate("/customer")}>
            Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
