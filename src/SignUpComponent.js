import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link
} from '@material-ui/core';

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

const SignUpForm = ({ handleSignInClick, handleSignUp }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call sign up API
    const signUpData = {
      username,
      password,
    };
    handleSignUp(signUpData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Sign Up
          </Button>
          <Typography align="center">
            Already have an account?{' '}
            <Link component="button" onClick={handleSignInClick}>
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default SignUpForm;