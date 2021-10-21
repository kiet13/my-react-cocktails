import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'
import logo from '../../logo-nav.svg'

export default function Navigation() {
  return (
    <div className={styles.Navigation}>
      <nav>
        <Link to="/">
          <img src={logo} alt="logo-nav" />
        </Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </div>
  )
}
