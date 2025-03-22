import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaHome, FaUserTie, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const StyledSidebar = styled('div')({
    width: '240px',
    height: '100vh',
    background: 'rgba(40, 30, 60, 0.4)', // Purple tinted background with transparency
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    color: '#fff',
    borderRight: '1px solid rgba(138, 43, 226, 0.2)', // Purple tinted border
    position: 'relative',
    zIndex: 2,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 10px rgba(138, 43, 226, 0.1)', // Added purple glow
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'linear-gradient(180deg, rgba(190, 130, 255, 0.1) 0%, rgba(138, 43, 226, 0.05) 30%, rgba(100, 30, 180, 0.02) 70%, rgba(80, 20, 140, 0.0) 100%)', // Purple gradient
        pointerEvents: 'none',
    },
    '& .active': {
        background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.7) 30%, rgba(180, 90, 255, 0.7) 90%)', // Purple gradient for active state
        borderRadius: '8px',
    },
    '& a:hover': {
        background: 'rgba(138, 43, 226, 0.15)', // Purple tinted hover
        borderRadius: '8px',
    }
});

const LogoContainer = styled(Box)({
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(138, 43, 226, 0.05)', // Very subtle purple background
    borderBottom: '1px solid rgba(138, 43, 226, 0.1)', // Purple tinted border
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
    background: 'rgba(138, 43, 226, 0.08)', // Subtle purple tint
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
        background: 'linear-gradient(45deg, rgba(138, 43, 226, 0) 0%, rgba(180, 90, 255, 0.15) 50%, rgba(138, 43, 226, 0) 100%)', // Purple shine
        transform: 'rotate(45deg)',
        transition: 'all 0.7s ease',
    },
    '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 0 6px rgba(138, 43, 226, 0.2)', // Added purple glow on hover
        transform: 'translateY(-2px)',
        '&:before': {
            top: '100%',
            left: '100%',
        }
    },
    '&.active': {
        background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.8) 30%, rgba(180, 90, 255, 0.8) 90%)', // Purple gradient for active state
        boxShadow: '0 6px 10px rgba(0,0,0,0.3), 0 0 8px rgba(138, 43, 226, 0.3)', // Purple glow for active
    },
    '& .icon': {
        marginRight: '10px',
        fontSize: '20px',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))',
        color: '#d4b0ff', // Light purple tint for icons
    }
});

const Sidebar = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleUploadDocument = () => {
        navigate('/document-uploader'); // Navigate to the DocumentUploader page
    };

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
                        <FaUserTie className="icon" /> Avatars
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={handleUploadDocument}>
                        <FaFileAlt className="icon" /> Upload Document
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
                    © 2025 Nexbot
                </Typography>
            </Box>
        </StyledSidebar>
    );
};

export default Sidebar;
