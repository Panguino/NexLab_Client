import React from 'react'
import styles from './RangeInput.module.scss'

interface IRangeInputProps {
	minValue: number
	maxValue: number
	value: number
	onChange: (value: number) => void
	unitStep?: number
}

const RangeInput: React.FC<IRangeInputProps> = ({ minValue, maxValue, value, onChange, unitStep = 1 }) => {
	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(Number(event.target.value))
	}

	return (
		<div className={styles.rangeInput}>
			<input type="range" min={minValue} max={maxValue} step={unitStep} value={value} onChange={handleSliderChange} className={styles.slider} />
		</div>
	)
}

export default RangeInput
