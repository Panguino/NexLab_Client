import React, { useState } from 'react'
import './PillSelector.scss'

interface PillItem {
	name: string
	value: string
}

interface PillSelectorProps {
	items: PillItem[]
	mode?: 'single' | 'multi'
	columns?: number
	onChange?: (selected: string | string[]) => void
	variant?: 'default' | 'simple'
}

const PillSelector: React.FC<PillSelectorProps> = ({ items, mode = 'single', columns, onChange, variant = 'default' }) => {
	const [selected, setSelected] = useState<string[]>([])

	const handleClick = (value: string) => {
		let newSelected: string[]
		if (mode === 'single') {
			newSelected = [value]
		} else {
			newSelected = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
		}
		setSelected(newSelected)
		if (onChange) {
			onChange(mode === 'single' ? newSelected[0] : newSelected)
		}
	}

	return (
		<div className={`pill-selector ${variant} ${columns ? `columns-${columns}` : ''}`}>
			{items.map((item) => (
				<div
					key={item.value}
					className={`pill-item ${selected.includes(item.value) ? 'selected' : ''}`}
					onClick={() => handleClick(item.value)}
				>
					{item.name}
				</div>
			))}
		</div>
	)
}

export default PillSelector
