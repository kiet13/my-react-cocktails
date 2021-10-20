import React from 'react'
import styles from './SearchForm.module.scss'

export default function SearchForm() {
  return (
    <form className={styles.SearchForm}>
      <label htmlFor="cocktailName" className={styles.SearchTitle}>
        search your favourite cocktail
      </label>

      <input type="text" name="cocktail-name" id="cocktailName" />
    </form>
  )
}
