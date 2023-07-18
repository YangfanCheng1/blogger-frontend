import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@material-ui/core";

const SignIn = ({ handleSignIn, navigate}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    handleSignIn(username, password, navigate);
  };

  return (
    <Container maxWidth="sm">
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
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>
      <Typography variant="body1">
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
    </Container>
  );
};

export default SignIn;