import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ShowCourses = () => {
  const [avail, setAvail] = useState([]);
  const [error, setError] = useState("");
  async function purchaseCourse(id) {
    try {
      console.log(id);
      const token = localStorage.getItem("userToken").split(" ")[1];
      console.log(token);
      if (!token) {
        setError("Signin first");
        return;
      }
      setError("");
      const response = await axios.post(`http://localhost:3000/users/courses/${id}`, {}, {
          headers:{
            'authorization': `Bearer ${token}`
          }
        }
      )
      console.log(response);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  }
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
    fetchCourses();
  },[]);
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
        <button onClick={() => purchaseCourse(course._id)}>Purchase course</button>
      </div>
    );
  });

  return (

    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {courseItems}
      {error}
    </div>
  )
}



export default ShowCourses