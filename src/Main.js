import React from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const Main = ({ handleSignOut, loggedIn }) => {
  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Typography variant="body1" style={{ marginRight: "10px" }}>
            Welcome, {loggedIn && "Username"}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        {/* Main content */}
      </Container>
    </Container>
  );
};

export default Main;