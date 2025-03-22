import { useEffect } from "react";
import { styled } from "@mui/system";

// Create styled components for text elements
const Title = styled('h1')({
  color: '#ffffff',
  fontSize: '3.5rem',
  fontWeight: '800',
  textShadow: '0 2px 10px rgba(138, 43, 226, 0.7), 0 4px 20px rgba(0,0,0,0.4)',
  marginBottom: '1rem',
  background: 'linear-gradient(45deg, #e0aaff 0%, #c77dff 50%, #9d4edd 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transform: 'perspective(500px) translateZ(30px)',
  letterSpacing: '2px',
});

const Subtitle = styled('p')({
  color: '#e0aaff',
  fontSize: '1.5rem',
  fontWeight: '500',
  textShadow: '0 2px 5px rgba(0,0,0,0.5)',
  marginBottom: '2rem',
});

function DIDChatbot() {
  useEffect(() => {
    // ✅ Load D-ID chatbot script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.src="https://agent.d-id.com/v1/index.js";
    script.setAttribute("data-name", "did-agent");
    script.setAttribute("data-mode", "fabio"); // Change to "widget" or "fullscreen" if needed
    script.setAttribute("data-client-key", "Z29vZ2xlLW9hdXRoMnwxMDk4NTQ4NTk4MTQ3OTY0MDI2ODg6QlFNaFp6TGN4aEk2WU1wVFZaTXIt");
    script.setAttribute("data-agent-id", "agt_cSWYN6Bt");
    script.setAttribute("data-monitor", "true");

    document.body.appendChild(script);

    return () => {
      // ✅ Cleanup script when unmounting
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Title>NexBot AI Assistant</Title>
      <Subtitle>Your virtual companion</Subtitle>
      {/* The chatbot will appear as an overlay or floating UI */}
      <div id="did-chatbot-container"></div>
    </div>
  );
}

export default DIDChatbot;
