import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import SplineBackground from "./SplineBackground";
import "../styles/LandingPage.css";

// ✅ Styled Components
const Title = styled("h1")({
  fontSize: "3.5rem",
  fontWeight: "800",
  textAlign: "center",
  textShadow: "0 2px 10px rgba(138, 43, 226, 0.7), 0 4px 20px rgba(0,0,0,0.4)",
  background: "linear-gradient(45deg, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  transform: "perspective(500px) translateZ(30px)",
  letterSpacing: "2px",
  marginBottom: "1rem",
});

const Subtitle = styled("p")({
  fontSize: "1.5rem",
  fontWeight: "500",
  color: "#e0aaff",
  textAlign: "center",
  textShadow: "0 2px 5px rgba(0,0,0,0.5)",
  marginBottom: "2rem",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
});

const RoleButton = styled("button")({
  fontSize: "1.3rem",
  fontWeight: "700",
  padding: "14px 28px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  transition: "all 0.4s ease",
  color: "#ffffff",
  textShadow: "0 2px 5px rgba(0,0,0,0.5)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 4px 15px rgba(106, 17, 203, 0.4)",
  background: "rgba(255, 255, 255, 0.1)",

  "&:hover": {
    transform: "scale(1.1)",
    background: "rgba(255, 255, 255, 0.3)",
    boxShadow: "0 6px 20px rgba(138, 43, 226, 0.6)",
  },
});

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* ✅ 3D Spline Background */}
      <SplineBackground />

      <div className="overlay">
        <Title>Welcome to NexBot</Title>
        <Subtitle>Select your role:</Subtitle>

        {/* ✅ Role Selection Buttons */}
        <ButtonContainer>
          <RoleButton onClick={() => navigate("/employer")}>👔 Employer</RoleButton>
          <RoleButton onClick={() => navigate("/customer")}>💼 Customer</RoleButton>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default LandingPage;
