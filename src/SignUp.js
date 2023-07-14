import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@material-ui/core";

const SignUp = ({ handleSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    handleSignUp(username, password);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Sign Up</Typography>
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
          Sign Up
        </Button>
      </form>
      <Typography variant="body1">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
    </Container>
  );
};

export default SignUp;