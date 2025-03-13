//  implement the home page UI here.
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// compoents imports
import Login from '../components/Login'
import Register from '../components/Register'
import Courses from '../components/Courses'
import ShowCourses from '../components/ShowCourses'

const Home = () => {
  return (
    //  write home page UI code here
    <div>
      <ShowCourses/>
    </div>
  )
}

export default Home