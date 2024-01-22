import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login({ onLogin }) {
  const defaultTheme = createTheme();
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const errorMessageRef = useRef(null);
  const navigate = useNavigate();
  const showErrorMessage = (message) => {
    errorMessageRef.current.textContent = message;
  };
  const handleChange = () => {
    errorMessageRef.current.textContent = '';
  };
  function handleSubmit(event) {
    event.preventDefault();

    const admin = new FormData(event.currentTarget);
    const x = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': admin.get('name'),
        'password': admin.get('password')
      })
    };

    fetch('http://localhost:8787/login', x)
      .then(response => {
        if (response.status === 401) {
          showErrorMessage('Invalid name or password');
          throw new Error('Unauthorized');
        }
      })
      .then(data => {
        // Assuming your login endpoint returns a success message
        alert("Login successful");
        // Call the onLogin callback passed as a prop
        onLogin();
        // Redirect to the "admin" path
        navigate('/admin');

      })
      .catch(error => {
        console.log('Error:', error);
      });
  }


  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Yael Barda © '}
        <Link color="inherit" href="https://mui.com/">
          Sound Studio
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}  >
      <Box
        sx={{
          backgroundImage: `url('/images/אולפן-הקטלות-1208x800.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.6,
        }}
      >
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: 'white',
              padding: 5,
              filter: 'brightness(1.2)',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
                inputRef={nameRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
                name="password"
                autoComplete="password"
                type="password"
                autoFocus
                inputRef={passwordRef}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <div ref={errorMessageRef} style={{ color: 'red', marginTop: '8px' }}></div>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
