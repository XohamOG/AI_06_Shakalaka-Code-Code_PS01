import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar";

import { Box, styled } from "@mui/material";

const LayoutContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  height: "100vh",
  padding: "20px",
  background: "#f4f6f9",
});

function Layout() {
  return (
    <LayoutContainer>
      {/* Sidebar */}
      <Sidebar />

    

    
    </LayoutContainer>
  );
}

export default Layout;
