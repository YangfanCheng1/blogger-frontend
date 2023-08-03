import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NavBar = ({ loggedIn, handleSignOut }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/thread">
          Thread
        </Button>
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