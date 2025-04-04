import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <div className="Button">
      <button className={props.params.class_name}> {props.params.value} </button>
    </div>
  )
}

export default Button;