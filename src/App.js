import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Main from "./Main";
import { Container, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import {API_BASE_URL} from "./apiConfig";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || "");

  useEffect(() => {
    if (authToken) {
      fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            localStorage.removeItem("authToken");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoggedIn(false);
          localStorage.removeItem("authToken");
        });
    } else {
      setLoggedIn(false);
    }
  }, [authToken]);

  const handleSignUp = (username, password) => {
    fetch(`${API_BASE_URL}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Signed up");
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSignIn = (username, password) => {
    fetch(`${API_BASE_URL}/users/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          response.headers.forEach(console.log)
          setLoggedIn(true);
          setAuthToken(response.headers.get("x-auth-token"));
          localStorage.setItem("authToken", response.headers.get("x-auth-token"));
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setAuthToken("");
    localStorage.removeItem("authToken");
  };

  const PrivateRoute = ({ element: Element, ...rest }) => {
    return loggedIn ? (
      <Route {...rest} element={<Element />} />
    ) : (
      <Navigate to="/sign-in" replace />
    );
  };

  return (
    <Router>
      <Container maxWidth="xl">
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
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
          <Routes>
            <Route path="/sign-up" element={<SignUp handleSignUp={handleSignUp} />} />
            <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} />} />
            <Route
              path="/"
              element={
                <PrivateRoute element={<Main />} />
              }
            />
          </Routes>
        </Container>
      </Container>
    </Router>
  );
};

export default App;