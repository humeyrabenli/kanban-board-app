import React from "react";
import { useLoginContext } from "../../contexts/LoginContext/LoginContext";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { headerStyles } from "./Header.styles";

const Header = () => {
  const { logout, username, isLoggedIn } = useLoginContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={headerStyles.appName}>
            Scrumboard App
          </Typography>
          {isLoggedIn && (
            <Box sx={headerStyles.rightBox}>
              <Button size="large" color="inherit" sx={headerStyles.button}>
                <Avatar />
                <Typography variant="subtitle2" sx={headerStyles.userName}>
                  {username}
                </Typography>
              </Button>

              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
