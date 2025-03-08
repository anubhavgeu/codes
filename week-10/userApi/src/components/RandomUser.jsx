import React, { useEffect, useState } from 'react'
import axios from 'axios';
const RandomUser = () => {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      try {
        const response = await axios.get(`https://randomuser.me/api/?page=${pageNumber}&results=10`);
        setUsers(prevValues => [...prevValues, ...response.data.results]);
        console.log(users);
      } catch (error) {
        console.log("Error fetching users " + error.message);
      }
      setLoading(false);
    }
    fetchImages();
  }, [pageNumber]);


  function loadMoreUser() {
    setPageNumber(pageNumber => pageNumber+1);
    console.log(pageNumber);
  }


  if (loading) {
    return <> Loading the data </>
  }
  return <> 
    <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap', padding: '30px', textAlign: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: `#f4f4f4`}}>
      {
        users.map((user,index) => (
          <div key={index} style={{margin: '15px', border: '1px solid black', padding: '20px', borderRadius: '12px', backgroundColor: `#fff`, boxShadow: `0px 4px 8px rgba(0,0,0,0.1)`, maxWidth: '200px', textAlign: 'center', animation: `fadeIn 0.5s ease-in-out forwards`} }>
            <img 
              src={user.picture.medium} 
              alt={`{user.name.title}: {user.name.first} {user.name.last}`}
              className='user-image'
              style={{borderRadius: '50%', width: '80px', height: '80px', marginBottom: '10px'}}
            />
            <h2 className='user-text' style={{fontSize: '18px', margin: '10px 0', color: `#555`}}>{user.name.title} {user.name.first} {user.name.last}</h2>
            <p style={{fontSize: '14px', color: `#555`}}>{user.email}</p>
          </div>
        ))
      }
      
    </div>
    <div style={{backgroundColor: `#f4f4f4`}}>
      <button onClick={loadMoreUser} style={{marginLeft: '50%'}}>Load Images</button>
    </div>
  </>
}

export default RandomUser