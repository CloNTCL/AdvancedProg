import React, { useState } from "react";
import { IconButton, Badge, Menu, MenuItem, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../assets/images/Logo_Efrei_2022.svg.png'; // Import du logo

const Header = () => {
  const [notifications, setNotifications] = useState(["Votre cours a été noté !"]);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [redirectPath, setRedirectPath] = useState('');

  // Gestion des notifications
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

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
          {/* Notifications */}
          <IconButton
            size="large"
            color="default" 
            onClick={handleNotificationMenuOpen}
          >
            <Badge
              color="error"
              badgeContent={notifications.length}
              invisible={notifications.length === 0}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <MenuItem key={index}>{notif}</MenuItem>
              ))
            ) : (
              <MenuItem>Aucune notification</MenuItem>
            )}
          </Menu>

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
