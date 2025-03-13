import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ShowCourses = () => {
    const [courses, setCourses] = useState([]);
    function fetchCouses() {
        axios.get('http://localhost:3000/courses')
            .then((response) => {
                setCourses(response.data)
                console.log(courses)
            })
    };
    useEffect(() => {
        fetchCouses();
    },[]);
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
        
    </div>
  )
}

function Display({description,price, imageLink, published, title}) {

}

export default ShowCourses