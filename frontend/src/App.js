import React from "react";
import AvatarChatbot from "./components/AvatarChatbot";
import Sidebar from "./components/sidebar";
import SplineBackground from "./components/SplineBackground";
import { Box, styled } from "@mui/material";

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
  zIndex: 1, // Ensure content appears above background
});

function App() {
  return (
    <AppContainer className="App">
      <SplineBackground />
      <Sidebar />
      <ContentContainer>
        <AvatarChatbot />
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
