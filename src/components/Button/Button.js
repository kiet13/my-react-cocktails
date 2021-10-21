import React from 'react'
import styles from './Button.module.scss'

export default function Button(props) {
  const inlineStyle = {
    width: props.width
  };
  
  return (
    <button className={styles.Button} style={inlineStyle}>
      {props.children}
    </button>
  )
}
