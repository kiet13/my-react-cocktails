import React from 'react'
import styles from './Cocktail.module.scss'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'


export default function Cocktail({ item }) {
  const {id, name, img, glass} = item;
  return (
    <div className={styles.Cocktail}>
      <img src={img} alt="cocktail glass" />
      <div>
        <h1 className={[styles.Name, "mb-1"].join(' ')}>{name}</h1>
        <p className={styles.Glass}>{glass}</p>
      </div>
      
      <Link to={`/cocktail/${id}`}>
        <Button width="100%">Details</Button>
      </Link>
    </div>
  )
}
