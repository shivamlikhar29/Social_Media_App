import React from 'react'
import {Container} from '@mui/material'

import { BrowserRouter,Route,Routes} from 'react-router-dom'


import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () =>{
    
    return( 
            <GoogleOAuthProvider clientId='31954847729-q5uprm272gkpmd220md8goag882qj1ij.apps.googleusercontent.com'> 
            <Container maxWidth='lg'>
                <Navbar />
               <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/auth' element={<Auth/>} />
               </Routes>
            </Container>
            </GoogleOAuthProvider>
    )
}

export default App