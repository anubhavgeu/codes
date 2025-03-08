import React, { useState } from 'react'
import AdaptionTable from './AdaptionTable';

const PetAdoptionForm = () => {  
  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState({
    petName: "",
    petType: "Dog",
    breed: "",
    adopterName: "",
    email: "",
    phone: ""
  });
  
  const [showTable, setShowTable] = useState(false);
  const { petName, petType, breed, adopterName, email, phone } = values;
  console.log(petName, petType, breed, adopterName, email, phone);
  
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues((prevVal) => ({
      ...prevVal,
      [name]: value
    }));
  };

  
  const handleSubmit = (e) => {
    console.log(`
        petName: ${petName},
        petType: ${petType},
        breed: ${breed},
        adopterName: ${adopterName},
        email: ${email},
        Phone: ${phone},
    `);
    if (!petName || !petType || !breed || !email || !adopterName || !phone) {
      alert('Enter all the fields');
      return;
    }
    const data = { petName, petType, breed, adopterName, email, phone };
    setFormData((prevData) => [...prevData, data]);
    setShowTable(true);
    setValues({
      petName: "",
      petType: "Dog",
      breed: "",
      adopterName: "",
      email: "",
      phone: ""
    });
  }

  const handleGoBack = () => setShowTable(!showTable);

  if (!showTable) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '500px' , backgroundColor: 'tan', padding: '20px'}}>
          <div>
            <label htmlFor="petName">Pet Name</label>
            <input
              type="text"
              name="petName"
              placeholder="Pet Name"
              value={petName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="petType">Pet Type</label>
            <select value={petType} name="petType" onChange={handleChange}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
            </select>
          </div>
          <div>
            <label htmlFor="breed">Breed</label>
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={breed}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='adopterName'>Your Name</label>
            <input type="text"
              name="adopterName"
              placeholder='Your Name'
              alue={adopterName}
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor='email'>
              Email
            </label>
            <input type="email" name="email" placeholder='Email' value={email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='phone'>
              Phone
            </label>
            <input type="text"
              name="phone"
              placeholder='Phone'
              value={phone}
              onChange={handleChange} 
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
      </div>
      </div>
    )
  }
  return <AdaptionTable formData = {formData} handleGoBack={handleGoBack} />
}

export default PetAdoptionForm