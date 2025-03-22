import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaHome, FaUserTie, FaFileAlt } from "react-icons/fa";

const StyledSidebar = styled('div')({
  width: '240px',
  height: '100vh',
  background: 'rgba(30, 30, 30, 0.85)', // More transparent background
  backdropFilter: 'blur(10px)', // Add blur effect to what's behind
  color: '#fff',
  borderRight: '1px solid #333',
  position: 'relative',
  zIndex: 2, // Ensure sidebar appears above background
  '& .active': {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: '8px',
  },
  '& a:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
  }
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
  padding: '0 16px',
  margin: '20px 0',
});

const NavItem = styled('li')({
  margin: '12px 0',
});

const NavLink = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(5px)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-100%',
    left: '-100%',
    width: '300%',
    height: '300%',
    background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
    transform: 'rotate(45deg)',
    transition: 'all 0.7s ease',
  },
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    transform: 'translateY(-2px)',
    '&:before': {
      top: '100%',
      left: '100%',
    }
  },
  '&.active': {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 6px 10px rgba(0,0,0,0.4)',
  },
  '& .icon': {
    marginRight: '10px',
    fontSize: '20px',
    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
  }
});

const Sidebar = () => {
  return (
    <StyledSidebar className="sidebar">
      <LogoContainer className="logo-container">
        <img 
          src="/Nexbot logo.png" 
          alt="Logo" 
          className="logo" 
          style={{ 
            width: '80px', 
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)'
          }} 
        />
      </LogoContainer>
      <NavList>
        <NavItem>
          <NavLink className="active">
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
          style={{ 
            color: 'rgba(255,255,255,0.7)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}
        >
          © 2025 Emotion Viewer
        </Typography>
      </Box>
    </StyledSidebar>
  );
};

export default Sidebar;
