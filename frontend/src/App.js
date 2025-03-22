import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Employer from "./components/Employee"; // Employer component
import Customer from "./components/Customer"; // Customer component
import ChatHistory from "./components/ChatHistory"; // Import the ChatHistory component
import Sidebar from "./components/sidebar";
import SplineBackground from "./components/SplineBackground";
import AvatarChatbot from "./components/AvatarChatbot";
import { Box, styled } from "@mui/material";

const AppContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  psosition: 'relative',
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  overflow: 'auto',
  height: '100vh',
  position: 'relative',
  zIndex: 1, // Ensures content appears above background
});

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Main App with Sidebar */}
        <Route path="/app/*" element={
          <AppContainer>
            <SplineBackground />
            <Sidebar />
            <ContentContainer>
              <Routes>
                <Route path="/" element={<AvatarChatbot />} />
                <Route path="/home" element={<AvatarChatbot />} />
                <Route path="/chat-history" element={<ChatHistory />} />
              </Routes>
            </ContentContainer>
          </AppContainer>
        } />

        {/* Employer & Customer Routes */}
        <Route path="/employer" element={
          <AppContainer>
            <ContentContainer>
              <Employer />
            </ContentContainer>
          </AppContainer>
        } />

        <Route path="/customer" element={
          <AppContainer>
            <ContentContainer>
              <Customer />
            </ContentContainer>
          </AppContainer>
        } />
      </Routes>
    </Router>
  );
}

export default App;
