import React, { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  Typography, Button, TextField, List, ListItem, ListItemText
} from "@material-ui/core";
import axios from "axios";

const Thread = ({ handleSignOut, loggedIn }) => {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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

      await axios.post("http://localhost:8080/posts", payload);
      fetchThreads();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
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

        <div>
          <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Latest" />
            <Tab label="Popular" />
            <Tab label="For you" />
          </Tabs>
          <List style={{ marginTop: "20px" }}>
            {threads.map((thread) => (
              <ListItem key={thread.id} alignItems="flex-start" style={{ border: "1px solid #ccc", borderRadius: "4px", marginBottom: "10px", padding: "10px" }}>
                <ListItemText
                  primary={<Typography variant="h6" style={{ fontWeight: "bold" }}>{thread.title}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" style={{ color: "#666" }}>
                        {thread.description}
                      </Typography>
                      <Typography component="span" variant="caption" style={{ display: "block", marginTop: "5px", color: "#999" }}>
                        Posted by {thread.username}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Container>

    </div>
  );
};

export default Thread;
