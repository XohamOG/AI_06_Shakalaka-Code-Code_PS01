import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaHome, FaUserTie, FaFileAlt } from "react-icons/fa";

const StyledSidebar = styled('div')({
  width: '240px',
  height: '100vh',
  background: 'rgba(40, 30, 60, 0.4)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  color: '#fff',
  borderRight: '1px solid rgba(138, 43, 226, 0.2)', 
  position: 'relative',
  zIndex: 2,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 10px rgba(138, 43, 226, 0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(180deg, rgba(190, 130, 255, 0.1) 0%, rgba(138, 43, 226, 0.05) 30%, rgba(100, 30, 180, 0.02) 70%, rgba(80, 20, 140, 0.0) 100%)', 
    pointerEvents: 'none',
  },
  '& .active': {
    background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.7) 30%, rgba(180, 90, 255, 0.7) 90%)',
    borderRadius: '8px',
  },
  '& a:hover': {
    background: 'rgba(138, 43, 226, 0.15)',
    borderRadius: '8px',
  }
});

const LogoContainer = styled(Box)({
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(138, 43, 226, 0.05)',
  borderBottom: '1px solid rgba(138, 43, 226, 0.1)',
});

const NavList = styled('ul')({
  listStyle: 'none',
  padding: '0 16px',
  margin: '20px 0',
});

const NavItem = styled('li')({
  margin: '12px 0',
});

const NavLinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  color: '#fff',
  textDecoration: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
  background: 'rgba(138, 43, 226, 0.08)', 
  backdropFilter: 'blur(8px)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-100%',
    left: '-100%',
    width: '300%',
    height: '300%',
    background: 'linear-gradient(45deg, rgba(138, 43, 226, 0) 0%, rgba(180, 90, 255, 0.15) 50%, rgba(138, 43, 226, 0) 100%)',
    transform: 'rotate(45deg)',
    transition: 'all 0.7s ease',
  },
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 0 6px rgba(138, 43, 226, 0.2)',
    transform: 'translateY(-2px)',
    '&:before': {
      top: '100%',
      left: '100%',
    }
  },
  '&.active': {
    background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.8) 30%, rgba(180, 90, 255, 0.8) 90%)',
    boxShadow: '0 6px 10px rgba(0,0,0,0.3), 0 0 8px rgba(138, 43, 226, 0.3)', 
  },
  '& .icon': {
    marginRight: '10px',
    fontSize: '20px',
    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
    color: '#d4b0ff', 
  }
});

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

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
          <NavLinkStyled 
            to="/app/home" 
            className={path === "/app/home" || path === "/app/" ? "active" : ""}
          >
            <FaHome className="icon" /> Home
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled 
            to="/app/profile" 
            className={path === "/app/profile" ? "active" : ""}
          >
            <FaUserTie className="icon" /> Profile
          </NavLinkStyled>
        </NavItem>
        <NavItem>
          <NavLinkStyled 
            to="/app/chat-history" 
            className={path === "/app/chat-history" ? "active" : ""}
          >
            <FaFileAlt className="icon" /> Chat history
          </NavLinkStyled>
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
          © 2025 Nexbot
        </Typography>
      </Box>
    </StyledSidebar>
  );
};

export default Sidebar;
