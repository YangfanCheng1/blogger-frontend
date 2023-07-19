import React, { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, Typography, Button, TextField, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";

const Main = ({ handleSignOut, loggedIn }) => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await axios.get("http://localhost:8080/posts?pageSize=10");
      setThreads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        username: loggedIn.username,
        title,
        description
      };

      await axios.post("/posts", payload);
      fetchThreads();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Thread App
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      
        <Container>
          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              minRows={4}
              fullWidth
              required
              style={{ marginBottom: "10px" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Thread
            </Button>
          </form>

          <List>
            {threads.map((thread) => (
              <ListItem key={thread.id}>
                <ListItemText
                  primary={thread.title}
                  secondary={thread.description}
                />
              </ListItem>
            ))}
          </List>
        </Container>

    </div>
  );
};

export default Main;