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
  background: "rgba(20, 20, 40, 0.8)", // Dark semi-transparent background for depth
});

const SidebarContainer = styled(Box)({
  width: "250px",
  minWidth: "250px",
  height: "100vh",
  zIndex: 2,
  boxShadow: "4px 0 12px rgba(0, 0, 0, 0.3)",
});

const ContentContainer = styled(Box)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  height: "100vh",
  padding: "30px",
  position: "relative",
  zIndex: 1, // Ensure content appears above background
  backdropFilter: "blur(10px)", // Glassmorphism effect
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.08)", // Subtle transparent white
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
});

const DocumentUploaderContainer = styled(Box)({
  padding: "20px",
  background: "rgba(255, 255, 255, 0.05)", // Light transparent white
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  marginBottom: "20px",
});

function Layout({ children }) {
  return (
    <LayoutContainer>
      {/* 3D Spline Background */}
      <SplineBackground />

      {/* Sidebar */}
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      {/* Main Content Area */}
      <ContentContainer>
        {/* Document Uploader Section */}
        <DocumentUploaderContainer>
          <DocumentUploader />
        </DocumentUploaderContainer>

        {/* Main Content */}
        {children}
      </ContentContainer>
    </LayoutContainer>
  );
}

export default Layout;
