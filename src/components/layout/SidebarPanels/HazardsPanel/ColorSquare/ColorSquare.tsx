import styles from './ColorSquare.module.scss'

const ColorSquare = ({ color, amount, opacity, active, disabled }) => {
	return (
		<div
			className={styles.ColorSquare}
			style={{
				backgroundColor: `rgb(${color})`,
				opacity,
				border: active ? '1px solid white' : 'none',
				visibility: disabled ? 'hidden' : 'visible'
			}}
		>
			{amount !== 0 ? amount : null}
		</div>
	)
}
ColorSquare.whyDidYouRender = true
export default ColorSquare
