import React from "react";
import AvatarChatbot from "./components/AvatarChatbot";
import Sidebar from "./components/sidebar";
import { Box, styled } from "@mui/material";

const AppContainer = styled(Box)({
  display: 'flex',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  overflow: 'auto',
  height: '100vh',
});

function App() {
  return (
    <AppContainer className="App">
      <Sidebar />
      <ContentContainer>
        <AvatarChatbot />
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
