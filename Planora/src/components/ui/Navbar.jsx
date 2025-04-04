import React from 'react'
import Button from './Button.jsx'
import './Navbar.css'

const Get_Start = {
    class_name : "get_start",
    value : "Get Started"
}


const Navbar = () => {
  return (
    <div className='navbar'>
        <Button params = {Get_Start}/>
        <a href="">Login</a>
    </div>
  )
}

export default Navbar;