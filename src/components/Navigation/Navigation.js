import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
export default function Navigation() {
  return (
    <div className={styles.Navigation}>
      <nav>
        <Link to="/">
          <img src="logo-nav.svg" alt="logo-nav" />
        </Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </div>
  )
}
