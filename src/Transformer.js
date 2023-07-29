import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, RadioGroup, Radio, FormControlLabel, Button, Container } from '@material-ui/core';
import axios from 'axios';

const Transformer = () => {
  const [selectedOption, setSelectedOption] = useState('funny');
  const [textBlock, setTextBlock] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      selectedOption,
      textBlock,
    };

    try {
      const response = await axios.post('http://localhost:8080/transform', formData);
      
      console.log('Form data sent successfully.');
      // You can handle the response from the backend here if needed.
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <Container>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Transformer
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              multiline
              minRows={4}
              variant="outlined"
              fullWidth
              label="Large Text Block"
              value={textBlock}
              onChange={(e) => setTextBlock(e.target.value)}
            />

            <RadioGroup name="mood" value={selectedOption} onChange={handleOptionChange}>
              <FormControlLabel value="funny" control={<Radio />} label="Funny" />
              <FormControlLabel value="exciting" control={<Radio />} label="Exciting" />
              <FormControlLabel value="sad" control={<Radio />} label="Sad" />
              <FormControlLabel value="angry" control={<Radio />} label="Angry" />
            </RadioGroup>

            <Button type="submit" variant="contained" color="primary">
              Transform
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Transformer;
