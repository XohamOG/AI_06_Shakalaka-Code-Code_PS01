import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Employer from "./components/Employee"; // Employer component
import Customer from "./components/Customer"; // Customer component
import DocumentUploader from "./components/DocumentUploader"; // DocumentUploader component
import { Box, styled } from "@mui/material";
import DocumentLayout from "./components/documentLayout";

const AppContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
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

        {/* Document Uploader Route */}
        <Route path="/document-uploader" element={
          <AppContainer>
            <ContentContainer>
              <DocumentLayout />
            </ContentContainer>
          </AppContainer>
        } />
      </Routes>
    </Router>
  );
}

export default App;
