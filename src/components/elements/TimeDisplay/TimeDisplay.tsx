import React from 'react'
import styles from './TimeDisplay.module.scss'

interface ITimeDisplayProps {
	value: string
	maxValue?: string
	unit?: string
}

const TimeDisplay: React.FC<ITimeDisplayProps> = ({ value, maxValue, unit }) => {
	const displayMaxValue = maxValue ? ` / ${maxValue}${unit}` : ''

	return <div className={styles.timeDisplay}>{`${value}${unit}${displayMaxValue}`}</div>
}

export default TimeDisplay
