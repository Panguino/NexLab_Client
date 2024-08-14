'use client'
import styles from './MultiButtonToggle.module.scss'

const MultiButtonToggle = ({ options, value, onChange, inactive = false }) => {
	return (
		<div className={`${styles.MultiButtonToggle} ${inactive ? styles.inactive : null}`}>
			{options.map(({ label, value: optionValue }, index) => (
				<div
					key={index}
					className={`${styles.option} ${value === optionValue ? styles.selected : ''}`}
					onClick={() => {
						onChange(optionValue)
					}}
				>
					{label}
				</div>
			))}
		</div>
	)
}

export default MultiButtonToggle
