import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../actions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();  

function LoginPage() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    // const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const error = useSelector(state => state.alert);

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: 'url(https://source.unsplash.com/random)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Link to='/35mm'>
                   <img src='/public/logo3.jpg' alt='35mm logo' width='100px' />                
                   </Link>
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 1 }}  >
                  <Typography key={error.message} color='error'>{error.message}</Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      type="text" 
                      value={username}
                      onChange={handleChange}        
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={handleChange}
                    />

                    {/* <FormControlLabel */}
                      {/* control={<Checkbox value="remember" color="primary" />} */}
                      {/* label="Remember me" */}
                    {/* /> */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container justifyContent="center">
                      {/* <Grid item xs> */}
                        {/* <Link href="#" variant="body2"> */}
                          {/* Forgot password? */}
                        {/* </Link> */}
                      {/* </Grid> */}
                      <Grid item>
                        <Link to="/register" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                      {/* {message} */}
                    </Grid>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            </ThemeProvider>
        </>
    );
}

export { LoginPage };