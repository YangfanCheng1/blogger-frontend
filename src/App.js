import React, { useState, useEffect  } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignInForm from './SignInComponent';
import SignUpForm from './SignUpComponent';
import { API_BASE_URL } from './apiConfig';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const BlogPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5" align="center">
          Welcome to the Blog Page
        </Typography>
        {/* Add blog content here */}
      </div>
    </Container>
  );
};

const App = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
          credentials: 'include',
        });
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error authenticating user:', error);
        setIsLoggedIn(false);
      }
    };

    if (isSignInPage && !isLoggedIn) {
      authenticateUser();
    }
  }, [isSignInPage, isLoggedIn]);

  // sign up
  const handleSignUpClick = () => {
    setIsSignInPage(false);
  };

  // sign in
  const handleSignInClick = () => {
    setIsSignInPage(true);
  };

  const handleSignIn = (signInData) => {
    // Call sign in API endpoint
    fetch(`${API_BASE_URL}/users/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful sign in
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // Handle sign in error
        console.error('Error signing in:', error);
      });
  };

  const handleSignUp = (signUpData) => {
    // Call sign up API endpoint
    fetch(`${API_BASE_URL}/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful sign up
        setIsSignInPage(true);
      })
      .catch((error) => {
        // Handle sign up error
        console.error('Error signing up:', error);
      });
  };

  return (
    <div>
      {
        isLoggedIn
          ? (<BlogPage />)
          : (isSignInPage 
            ? (<SignInForm handleSignUpClick={handleSignUpClick} handleSignIn={handleSignIn} />) 
            : (<SignUpForm handleSignInClick={handleSignInClick} handleSignUp={handleSignUp} />))
      }
    </div>
  );
};

export default App;