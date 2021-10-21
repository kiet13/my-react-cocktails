import React from 'react'
import styles from './CocktailList.module.scss'
import Cocktail from '../Cocktail/Cocktail'

export default function CocktailList({ cocktails }) {
  const cocktailList = cocktails.map(item => 
    <Cocktail key={item.id} item={item} />
  )

  return (
    <>
      <h1 className={styles.CocktailsHeading}>Cocktails</h1>
      <div className={styles.CocktailList}>
        {cocktailList}
      </div>
    </>
  )
}
