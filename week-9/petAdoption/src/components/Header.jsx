import React from 'react'

const Header = ({message}) => {
  return (
    <div
      style={
        {backgroundColor: 'tan', height:'70px', display: 'flex', justifyContent: 'center' , alignItems: 'center', opacity: 0.8, fontWeight: 'bold', fontSize: '25px', marginBottom: '30px'}
      }
    >{message}</div>
  )
}

export default Header