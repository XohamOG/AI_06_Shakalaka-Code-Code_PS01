import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Employer from "./components/Employee"; // Added Employer
import Customer from "./components/Customer"; // Added Customer
import AvatarChatbot from "./components/AvatarChatbot";
import Sidebar from "./components/sidebar";
import { Box, styled } from "@mui/material";

const AppContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  overflow: "auto",
  height: "100vh",
});

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Employer Dashboard */}
        <Route
          path="/employer"
          element={
            <AppContainer>
            
              <ContentContainer>
                <Employer />
              </ContentContainer>
            </AppContainer>
          }
        />

        {/* Customer Dashboard */}
        <Route
          path="/customer"
          element={
            <AppContainer>
      
              <ContentContainer>
                <Customer />
              </ContentContainer>
            </AppContainer>
          }
        />

    </Routes>
    </Router>
  );
}

export default App;
