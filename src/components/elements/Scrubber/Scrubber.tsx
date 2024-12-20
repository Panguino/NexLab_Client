import React from 'react'
import styles from './Scrubber.module.scss'

interface IScrubberProps {
	minValue: number
	maxValue: number
	value: number
	onChange: (value: number) => void
	unitStep?: number
}

const Scrubber: React.FC<IScrubberProps> = ({ minValue, maxValue, value, onChange, unitStep = 1 }) => {
	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value, 10)
		onChange(newValue)
	}

	return (
		<div className={styles.timelineScrubber}>
			<input type="range" min={minValue} max={maxValue} step={unitStep} value={value} onChange={handleSliderChange} className={styles.slider} />
		</div>
	)
}

export default Scrubber
