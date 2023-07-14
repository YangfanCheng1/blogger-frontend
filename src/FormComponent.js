import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
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

const FormComponent = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        // Handle success scenario
      } else {
        console.error('Error submitting form');
        // Handle error scenario
      }
    } catch (error) {
      console.error('Error submitting form', error);
      // Handle error scenario
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          Simple Form
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default FormComponent;