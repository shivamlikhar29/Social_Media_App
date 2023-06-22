import React, { useEffect } from 'react'
import {AppBar,Avatar,Button,Toolbar,Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode'


import memories from '../../images/memories.png'
import useStyles from './styles' 


function Navbar() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let location = useLocation();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(()=>{
        const token = user?.token;

        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp*1000 < new Date().getTime()) logout()
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


    const logout = () =>{
        googleLogout()
        dispatch({type:'LOGOUT'})
        navigate('/')
        setUser(false)
    }

  return (
    <> 
    <AppBar className={classes.appBar} position='static' color='inherit'>
       <div className={classes.brandContainer}> 
            <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>
            <img className={classes.image} src={memories} alt='memories' height='50' />
       </div>
    <Toolbar className={classes.toolbar}>
        {user ?  (
            <div className={classes.profile}>
                {/* <Avatar className={classes.purple} alt={user.result?.picture} src={user.result?.picture} ></Avatar>  */}
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result?.picture}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{String(user.result?.name)}</Typography>
                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
            </div>
        ) : (
            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
    </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar
