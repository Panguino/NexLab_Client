'use client'
import styles from './ColorSquare.module.scss'

const ColorSquare = ({ color }) => {
	return <div className={styles.ColorSquare} style={{ backgroundColor: `rgb(${color})` }} />
}

export default ColorSquare
