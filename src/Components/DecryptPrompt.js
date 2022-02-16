import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme();

export default function DecryptPrompt({ qs }) {
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // heroku sleeps api after 30 min
    const wakeApi = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}`);
    };
    wakeApi();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const settings = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: qs }),
      };
      try {
        const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/lookup`, settings);
        const response = await fetchResponse.json();
        setIsValid(response.isValid);
        setErrorMessage(response.error);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: qs }),
    };
    try {
      const fetchResponse = await fetch(`${process.env.REACT_APP_API_URL}/decrypt`, settings);
      const response = await fetchResponse.json();
      setMessage(response.message);
      return data;
    } catch (e) {
      return e;
    }
  };

  let ui;
  if (!isValid) {
    ui = (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              {errorMessage}
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else if (message) {
    ui = (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5" />
            <Box sx={{ width: 3 / 4, mt: 1, color: 'black' }}>
              <TextField
                multiline
                rows="6"
                margin="normal"
                required
                fullWidth
                id="message"
                label="Your private note"
                name="message"
                autoFocus
                value={message}
              />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  } else {
    ui = (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Are you ready to reveal this private note?
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 3 / 4, mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                REVEAL!
              </Button>
            </Box>
            <Backdrop
              sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return ui;
}
