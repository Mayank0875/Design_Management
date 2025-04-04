import React from 'react'
import Button from '../ui/Button'
import Navbar from '../ui/Navbar'
import './Dashboard.css'


const middle_part = ()=>{
    return (
        <div className='middle'>
            <h1>PLANORA</h1>
            <p></p>
        </div>
    )
}


const Dashboard = () => {
  return (
    <div className="fullscreen-bg">
        <Navbar/>
    </div>
  )
}

export default Dashboard