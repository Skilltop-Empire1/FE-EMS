import React from 'react'
import style from "./addButtonStyle.module.css";

const Button = (props) => {
  return (
  
        <button className={style.button} type="submit" disabled={props.disabled} onClick={props.onClick}>
          {props.add}
        </button>

  )
}

export default Button
