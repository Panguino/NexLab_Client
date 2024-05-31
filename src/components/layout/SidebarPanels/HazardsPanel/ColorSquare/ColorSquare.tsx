'use client'
import styles from './ColorSquare.module.scss'

const ColorSquare = ({ color, amount }) => {
	return (
		<div className={styles.ColorSquare} style={{ backgroundColor: `rgb(${color})` }}>
			{amount}
		</div>
	)
}

export default ColorSquare
