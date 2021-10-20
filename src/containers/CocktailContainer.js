import React, { useState, useEffect, useCallback } from 'react'
import axios from '../axios-order';
import styles from './CocktailContainer.module.scss'
import Navigation from '../components/Navigation/Navigation';

export default function CocktailContainer() {
  return (
    <div className={styles.CocktailContainer}>
        <Navigation />
    </div>
  )
}
