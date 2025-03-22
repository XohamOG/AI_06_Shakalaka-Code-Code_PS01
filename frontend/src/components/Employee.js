import React from "react";

import AvatarChatbot from "./AvatarChatbot"; // ✅ Ensure this file exists
import { Box, styled } from "@mui/material";

// ✅ Styled Components
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

function Employee() {
  return (
    <AppContainer>
      

      {/* Main Content */}
      <ContentContainer>
        <AvatarChatbot /> {/* ✅ Ensure this component is defined */}
      </ContentContainer>
    </AppContainer>
  );
}

export default Employee;
