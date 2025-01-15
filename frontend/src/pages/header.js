import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../assets/images/Logo_Efrei_2022.svg.png'; // Import du logo
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [language, setLanguage] = useState(i18n.language || "en");
  const [redirectPath, setRedirectPath] = useState("");

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
    localStorage.clear();
    setRedirectPath("/");
  };

  const handleProfileMenuCloseOne = () => {
    setProfileAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  return (
    <div position="static" style={{ backgroundColor: 'white' }} className="teacher-header">
      <div className="header-logo">
        <img src={logo} alt="School Logo" className="school-logo" />
      </div>
      <div className="header-icons">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => changeLanguage(language === "en" ? "fr" : "en")}
        >
          {language === "en" ? "FR" : "EN"}
        </Button>
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
          onClose={handleProfileMenuCloseOne}
        >
          <MenuItem onClick={handleProfileMenuClose}>{t("header.logout")}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
