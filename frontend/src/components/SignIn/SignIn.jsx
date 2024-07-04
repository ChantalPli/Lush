import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import './signIn.css'
import { Link as LinkRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../../redux/actions/userActions'


function SignInSide(props) {


  const handleSubmit = (event) => {
    event.preventDefault();
    const loggedUser = {
      email: event.target[0].value,
      password: event.target[2].value,
      from: "signin"
    }
    props.signInUser(loggedUser);
  };

  return (
    <div className="signInWrapper">
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1598764557991-b9f211b73b81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>

                <Grid item>
                  <LinkRouter className="linkEditSignIn" to="/SignUp" >Don't have an account? Sign Up</LinkRouter>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
const mapDispatchToProps = {
  signInUser: userActions.signInUser,
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    message: state.userReducer.message,
    message2: state.userReducer.message2,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);