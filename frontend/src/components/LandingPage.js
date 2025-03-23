import React from "react";
import { useNavigate } from "react-router-dom";
import { styled, keyframes } from "@mui/system";
import SplineBackground from "./SplineBackground";
import "../styles/LandingPage.css";

// Create flickering keyframes for the neon effect with reduced glow
const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow: 
      0 0 5px #fff,
      0 0 8px #fff,
      0 0 15px #fff,
      0 0 30px rgb(138, 43, 226),
      0 0 60px rgb(138, 43, 226),
      0 0 70px rgb(138, 43, 226),
      0 0 80px rgb(138, 43, 226),
      0 0 120px rgb(138, 43, 226);
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.7;
  }
  80%, 85% {
    text-shadow: 
      0 0 5px #fff,
      0 0 8px #fff,
      0 0 15px #fff,
      0 0 25px rgb(138, 43, 226),
      0 0 45px rgb(138, 43, 226),
      0 0 55px rgb(138, 43, 226);
    opacity: 0.9;
  }
`;

// ✅ Styled Components with neon effect
const Title = styled("h1")({
  fontSize: "3.5rem",
  fontWeight: "800",
  textAlign: "center",
  color: "#ffffff",
  textTransform: "uppercase",
  position: "relative",
  letterSpacing: "4px",
  animation: `${flicker} 5s infinite alternate`,
  marginBottom: "1.5rem",
  // Remove these for the neon effect
  // background: "linear-gradient(45deg, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)",
  // WebkitBackgroundClip: "text",
  // WebkitTextFillColor: "transparent",
  // transform: "perspective(500px) translateZ(30px)",
  '& span.broken': {
    animation: `${flicker} 2s infinite alternate`,
    animationDelay: '0.5s',
    display: 'inline-block',
  },
  '& span.dim': {
    opacity: 0.8,
    textShadow: 'none',
    animation: `${flicker} 7s infinite alternate`,
    animationDelay: '0.7s',
    display: 'inline-block',
  }
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
        <Title>
          <span className="dim">W</span>e<span className="broken">l</span>c<span className="dim">o</span>me to <span className="broken">N</span>e<span className="dim">x</span>B<span className="broken">o</span>t
        </Title>
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
