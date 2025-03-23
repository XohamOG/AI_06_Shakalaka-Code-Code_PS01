import { useEffect } from "react";
import { styled, keyframes } from "@mui/system";

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

// Create a styled title with neon glow effect
const NeonTitle = styled('h1')({
  color: '#ffffff',
  fontSize: '3.5rem',
  fontWeight: '800',
  textAlign: 'center',
  textTransform: 'uppercase',
  marginBottom: '1.5rem',
  position: 'relative',
  letterSpacing: '4px',
  animation: `${flicker} 5s infinite alternate`,
  padding: '0.2em 1em',
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

const Subtitle = styled('p')({
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '1.5rem',
  fontWeight: '500',
  marginBottom: '2.5rem',
});

function AvatarChatbot() {
  useEffect(() => {
    // Load D-ID chatbot script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.src="https://agent.d-id.com/v1/index.js";
    script.setAttribute("data-name", "did-agent");
    script.setAttribute("data-mode", "fabio"); // Change to "widget" or "fullscreen" if needed
    script.setAttribute("data-client-key", "Z29vZ2xlLW9hdXRoMnwxMTA4MTI3MzE0NzE1ODI2NzM2MjY6ZjBPU3l6U0UtTWgwOXZuUUVWd1Nn");
    script.setAttribute("data-agent-id", "agt_WCqKlZPh");
    script.setAttribute("data-monitor", "true");

    document.body.appendChild(script);

    return () => {
      // Cleanup script when unmounting
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ 
      textAlign: "center", 
      padding: "20px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", // Changed back to "center"
    }}>
      <NeonTitle>
        N<span className="broken">e</span>xB<span className="dim">o</span>t AI <span className="broken">A</span>ssistant
      </NeonTitle>
      <Subtitle>Your virtual Guide</Subtitle>
      
      {/* The chatbot will appear as an overlay or floating UI */}
      <div id="did-chatbot-container"></div>
    </div>
  );
}

export default AvatarChatbot;
