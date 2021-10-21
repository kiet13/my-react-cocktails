import React from 'react'
import styles from './Cocktail.module.scss'
import Button from '../Button/Button'

export default function Cocktail({ item }) {
  const {name, img, glass} = item;
  return (
    <div className={styles.Cocktail}>
      <img src={img} alt="cocktail glass" />
      <div>
        <h1 className="mb-1">{name}</h1>
        <p>{glass}</p>
      </div>
      <Button width="100%">Details</Button>
    </div>
  )
}
