import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ShowCourses = () => {
  const [avail, setAvail] = useState([]);
  function fetchCourses() {
    axios.get('http://localhost:3000/courses')
      .then((response) => {
        console.log("API Response:", response.data.courses); 
        setAvail(response.data.courses );
        console.log(avail)
      })
      .catch((error) => console.error("Error fetching courses:", error));
  };
  useEffect(() => {
    let timer = setInterval(fetchCourses,5000);
    return () => {
      clearInterval(timer);
    }
  },[]);
  const courseItems = avail.map((course) => {
    return (
      <div key={course._id}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <p>{course.price}</p>
        <img style={{height: '100px', width: '200px'}} src={course.imageLink} alt="Image pic" />
        <br />
        <button >Purchase course</button>
      </div>
    );
  });

  return (

    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {courseItems}
    </div>
  )
}



export default ShowCourses