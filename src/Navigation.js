import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Thread from "./Thread";
import { Container, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { API_BASE_URL } from "./apiConfig";
import NavBar from "./NavBar";
import Transformer from "./Transformer";

const Navigation = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
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
            return response.json();
          } else {
            setLoggedIn(false);
            localStorage.removeItem("authToken");
          }
          setLoading(false);
        })
        .then(data => {
            setUsername(data.message);
            setLoggedIn(true);
            setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoggedIn(false);
          setLoading(false);
          localStorage.removeItem("authToken");
        });
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  }, [authToken]);

  const handleSignUp = (username, password, navigate) => {
    fetch(`${API_BASE_URL}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/sign-in');
        } else {
          throw new Error("Error signing up");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSignIn = (username, password, navigate) => {
    fetch(`${API_BASE_URL}/users/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          setLoggedIn(true);
          setAuthToken(response.headers.get("x-auth-token"));
          localStorage.setItem("authToken", response.headers.get("x-auth-token"));
          navigate('/');
        } else {
          throw new Error("Error signing in");
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
    return <Navigate to="/sign-in" replace />;
  };

  const PrivateRoute = ({ element: Element, ...rest }) => {
    return loggedIn ? (
      <Thread />
    ) : (
      <Navigate to="/sign-in" replace />
    );
  };

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Container disableGutters maxWidth={false}>
      <NavBar loggedIn={loggedIn} handleSignOut={handleSignOut} />
      <div>
        <Routes>
          <Route path="/sign-up" element={<SignUp handleSignUp={handleSignUp} navigate={navigate}/>} />
          <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} navigate={navigate}/>} />
          <Route path="/" element={<PrivateRoute element={<Thread />} />} />
          <Route path="/thread" element={<Thread handleSignOut={handleSignOut} loggedIn={loggedIn} />} />

        </Routes>
      </div>
    </Container>
  );
};

export default Navigation;
