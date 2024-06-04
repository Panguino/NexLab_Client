import styles from './ColorSquare.module.scss'

const ColorSquare = ({ color, amount, opacity }) => {
	return (
		<div className={styles.ColorSquare} style={{ backgroundColor: `rgb(${color})`, opacity }}>
			{amount !== 0 ? amount : null}
		</div>
	)
}
ColorSquare.whyDidYouRender = true
export default ColorSquare
