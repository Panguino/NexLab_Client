import React from 'react'

interface ITimeDisplayProps {
	value: string
	maxValue?: string
	unit?: string
}

const TimeDisplay: React.FC<ITimeDisplayProps> = ({ value, maxValue, unit }) => {
	const displayMaxValue = maxValue ? ` / ${maxValue}${unit}` : ''

	return <div>{`${value}${unit}${displayMaxValue}`}</div>
}

export default TimeDisplay
