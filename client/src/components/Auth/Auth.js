import React from 'react'
import { Button,Typography,Container,Avatar,Paper,Grid} from '@mui/material'
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import Icon from './icon';

import useStyles from './styles'

export default function Auth() {
  const classes = useStyles()

  const [showPassword,setShowPassword] = useState(false)
  const [isSignup,setIsSignup] = useState(false)

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const handleShowPassword = () => {
      function setShowPassword(prevShowPassword){
         return !prevShowPassword
      }
  }

  const switchMode = ()=> {
    setIsSignup((p)=>!p)
    handleShowPassword(false)
  }

  const googleSuccess = async (res) => {
    console.log(res)
  }

  
  const googleFailure = (error) => {
    console.log("Google Sign In was unsuccessful. Try Again Later")
    console.log(error)
  }

  return (
     <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
              <Input autoFocus name='firstName' label="First Name" handleChange={handleChange} half/>
              <Input half name='lastName' label="First Name" handleChange={handleChange}/>
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
             {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
             </Grid>
             <GoogleLogin className={classes.googleButton} 
                    color='primary' 
                    fullWidth 
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}  />
             <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
              {isSignup ? "Sign Up" : "Sign In" }
             </Button>
             {/* <GoogleLogin
              clientId='31954847729-q5uprm272gkpmd220md8goag882qj1ij.apps.googleusercontent.com'
              render={(renderProps)=>(
                <Button 
                    className={classes.googleButton} 
                    color='primary' 
                    fullWidth 
                    onClick={renderProps.onClick} 
                    disabled={renderProps.disabled} 
                    startIcon={<Icon />} variant='contained' >Google Sign In
                </Button>)} 
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
              /> */}
             <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                      {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                    </Button>
                </Grid>
             </Grid>
        </form>
      </Paper>
     </Container>
  )
}

