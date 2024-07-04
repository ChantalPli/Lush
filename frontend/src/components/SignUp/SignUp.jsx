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
import './signUp.css'
import { Link as LinkRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../../redux/actions/userActions'

function SignUp(props) {

  const handleSubmit = (event) => {

    event.preventDefault()

    const userData = {
      firstName: event.target[0].value,
      lastName: event.target[2].value,
      email: event.target[4].value,
      password: event.target[6].value,
      profileurl: event.target[8].value,
      from: 'signup'
    }
    props.signUpUser(userData)
    console.log("🚀 ~ file: SignUp.jsx ~ line 30 ~ handleSubmit ~ userData", userData)

  }

  return (
    <div>
      <div className="signUpWrapper">
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={5}
            sx={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
            <Box
              className="cardSignUp"
              sx={{
                margin: 10,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Pleas register your account.
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    // value={email}
                    // onChange={e=>setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="profileurl"
                      label="Add a url with your best photo!"
                      name="profileurl"
                    />
                  </Grid>

                  <Grid item xs={12}>



                  </Grid>


                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <LinkRouter className="linkEditSignUp" to="/SignIn" >Already have an account? Sign In</LinkRouter>

                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>

    </div>
  )
}
const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
}
const mapStateToProps = (state) => {
  return {
    message: state.userReducer.message,
    message2: state.userReducer.message2,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// export default SignUp