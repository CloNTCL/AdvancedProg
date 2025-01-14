import React, { useState } from "react";
import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../assets/images/Logo_Efrei_2022.svg.png'; // Import du logo

const Header = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [redirectPath, setRedirectPath] = useState('');

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  // Gestion du profil
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    localStorage.clear();
    setRedirectPath('/');
  };

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div position="static" style={{ backgroundColor: 'white' }} className="teacher-header">
        <div className="header-logo">
          <img src={logo} alt="School Logo" className="school-logo" />
          <Typography variant="h6" component="div" style={{ color: '#343a40' }}>
          </Typography>
        </div>      
        <div className="header-icons">
          {/* Profil */}
          <IconButton
            size="large"
            edge="end"
            color="default"  
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
    </div>
  );
};

export default Header;
