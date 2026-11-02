import React from 'react'
import styles from './Header.module.css'
function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Employee Management</h1>
      <p className={styles.subtitle}>Manage your employees efficiently</p>
    </div>
  )
}

export default Header