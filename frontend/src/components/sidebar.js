import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaHome, FaUserTie, FaFileAlt } from "react-icons/fa";

const StyledSidebar = styled('div')({
  width: '240px',
  height: '100vh',
  background: '#1e1e1e',
  color: '#fff',
  borderRight: '1px solid #333',
});

const LogoContainer = styled(Box)({
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #333',
});

const NavList = styled('ul')({
  listStyle: 'none',
  padding: '0',
  margin: '20px 0',
});

const NavItem = styled('li')({
  margin: '8px 0',
});

const NavLink = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '& .icon': {
    marginRight: '10px',
    fontSize: '18px',
  }
});

const Sidebar = () => {
  return (
    <StyledSidebar className="sidebar">
      <LogoContainer className="logo-container">
        <img 
          src="/assets/icon.jpeg" 
          alt="Logo" 
          className="logo" 
          style={{ width: '80px', borderRadius: '50%' }} 
        />
      </LogoContainer>
      <NavList>
        <NavItem>
          <NavLink>
            <FaHome className="icon" /> Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <FaUserTie className="icon" /> Start Interview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <FaFileAlt className="icon" /> Interview Sessions
          </NavLink>
        </NavItem>
      </NavList>
      <Box mt="auto" p={2}>
        <Typography 
          variant="body2" 
          align="center" 
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          © 2025 Emotion Viewer
        </Typography>
      </Box>
    </StyledSidebar>
  );
};

export default Sidebar;
