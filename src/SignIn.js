import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4), // Add top margin of 16px
  },
}));

const SignIn = ({ handleSignIn, navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("Username or password is incorrect");

    handleSignIn(username, password, navigate);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card>
        <CardContent>
          <Typography variant="h4">Sign In</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <CardActions>
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </CardActions>
          </form>
          <Typography variant="body1">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </Typography>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;