import React from 'react'
import styles from './TimeDisplay.module.scss'

interface ITimeDisplayProps {
	value: string
	maxValue?: string
	unit?: string
}

const TimeDisplay: React.FC<ITimeDisplayProps> = ({ value, maxValue, unit }) => {
	const displayUnit = unit ? unit : ''
	const displayMaxValue = maxValue ? ` / ${maxValue}${displayUnit}` : ''

	return <div className={styles.timeDisplay}>{`${value}${displayUnit}${displayMaxValue}`}</div>
}

export default TimeDisplay
