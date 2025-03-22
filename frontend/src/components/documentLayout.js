import React from "react";
import Sidebar from "./sidebar";
import SplineBackground from "./SplineBackground";
import { Box, styled } from "@mui/material";
import DocumentUploader from "./DocumentUploader";

const LayoutContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
  position: "relative",
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  height: "100vh",
  padding: "20px",
  position: "relative",
  zIndex: 1, // Ensure content appears above background
});

function Layout({ children }) {
  return (
    <LayoutContainer>
      {/* 3D Spline Background */}
      <SplineBackground />

      {/* Sidebar */}
      <Sidebar />

      <DocumentUploader />

      {/* Main Content */}
      <ContentContainer>{children}</ContentContainer>
    </LayoutContainer>
  );
}

export default Layout;
