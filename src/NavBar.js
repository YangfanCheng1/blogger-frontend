import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavBar = ({ loggedIn, handleSignOut }) => {
  const appBarStyles = {
    backgroundColor: "#1A237E", // Background color
    color: "white", // Text color
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    boxShadow: "none", // Remove the box shadow
  };

  const logoStyles = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "24px",
  };

  const welcomeStyles = {
    marginRight: "10px",
    fontWeight: "bold",
    fontSize: "18px",
  };

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Typography variant="body1" style={{ marginRight: "10px" }}>
            Welcome, {loggedIn ? "Username" : ""}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
  );
};

export default NavBar;