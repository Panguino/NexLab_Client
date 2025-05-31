import React, { useState } from 'react'
import styles from './RangeInput.module.scss'

interface IRangeInputProps {
	minValue: number
	maxValue: number
	value: number
	onChange?: (value: number) => void
	unitStep?: number
	onChangeEnd?: (value: number) => void
}

const RangeInput: React.FC<IRangeInputProps> = ({ minValue, maxValue, value, onChange, unitStep = 1, onChangeEnd }) => {
	const [localValue, setLocalValue] = useState(value)
	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = Number(event.target.value)
		if (onChange) {
			onChange(newValue)
		} else {
			setLocalValue(newValue)
		}
	}
	const handleSliderChangeEnd = (event: any) => {
		onChangeEnd && onChangeEnd(Number(event.target.value))
	}

	return (
		<div className={styles.rangeInput}>
			<input
				type="range"
				min={minValue}
				max={maxValue}
				step={unitStep}
				value={onChange ? value : localValue}
				onChange={handleSliderChange}
				onMouseUp={handleSliderChangeEnd}
				onTouchEnd={handleSliderChangeEnd}
				className={styles.slider}
			/>
		</div>
	)
}

export default RangeInput
