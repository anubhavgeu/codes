//  implement the home page UI here.
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {BrowserRouter, Route, Routes} from 'react-router';
// compoents imports
import Login from '../components/Login'
import Register from '../components/Register'
import ShowCourses from '../components/ShowCourses'
import Header from '../components/Header';
import AdminSignup from '../components/AdminSignup';
import AdminLogin from '../components/AdminLogin';

function Home ()  {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<ShowCourses/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path='/admin-signup' element={<AdminSignup/>} />
        <Route path='/admin-signin' element={<AdminLogin/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Home