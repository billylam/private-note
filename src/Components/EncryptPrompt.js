import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InputAdornment from '@mui/material/InputAdornment';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function EncryptPrompt() {
  const [key, setKey] = useState(null);
  const [open, setOpen] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://billylam.github.io/private-notes/?key=${key}`);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (!data.get('message')) return;

    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: data.get('message') }),
    };
    try {
        const fetchResponse = await fetch(`https://private-note-api.herokuapp.com/encrypt`, settings);
        const response = await fetchResponse.json();
        setKey(encodeURIComponent(response.key));
        return data;
    } catch (e) {
        return e;
    }    
  };

  const ui = key ? (<ThemeProvider theme={theme}>
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
        <Typography component="h1" variant="h5" sx={{ width: 3/4 , mt: 1 }}>
          Your private note is available at:
        </Typography>
        <Box
          sx={{
            width: 3/4,
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              name="url"
              autoComplete="email"
              autoFocus
              value={`https://billylam.github.io/private-notes/?key=${key}`}
              InputProps={{
                endAdornment: 
                  <InputAdornment position="end">
                    <ContentCopyIcon
                      aria-label="copy link"
                      onClick={copyLink}
                      edge="end"
                    >
                    </ContentCopyIcon>
                  </InputAdornment>
              }}
            />
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  </ThemeProvider>) : (
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
            Create a private note
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: 3/4 , mt: 1 }}>
            <TextField
              multiline
              rows="6"
              margin="normal"
              required
              fullWidth
              id="message"
              label="Message to encrypt"
              name="message"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Encrypt!
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )

  return ui;
}