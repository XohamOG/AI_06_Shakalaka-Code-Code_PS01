import { useEffect } from "react";

function DIDChatbot() {
  useEffect(() => {
    // ✅ Load D-ID chatbot script dynamically
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://agent.d-id.com/v1/index.js";
    script.setAttribute("data-name", "did-agent");
    script.setAttribute("data-mode", "inline"); // Change to "widget" or "fullscreen" if needed
    script.setAttribute("data-client-key", "MjAyMy5zb2hhbS5wYXRpbEB2ZXMuYWMuaW4:VYdyQkAhPq1cjxhKOBlG-");
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
      <h1>D-ID AI Chatbot</h1>
      <p>Chat with our AI assistant below:</p>
      {/* The chatbot will appear as an overlay or floating UI */}
      <div id="did-chatbot-container"></div>
    </div>
  );
}

export default DIDChatbot;
