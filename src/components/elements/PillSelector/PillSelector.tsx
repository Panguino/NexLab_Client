import React, { useState } from 'react'
import './PillSelector.scss'

export interface PillItem {
	name: string
	value: string[]
}

export interface PillSelectorProps {
	items: PillItem[]
	maxSelect?: number
	columns?: number
	onChange?: (selected: string[]) => void
}

const PillSelector: React.FC<PillSelectorProps> = ({ items, maxSelect = 1, columns, onChange }) => {
	const [selected, setSelected] = useState<string[]>([])

	const handleClick = (value: string) => {
		let newSelected: string[]
		if (selected.includes(value)) {
			newSelected = selected.filter((item) => item !== value)
		} else {
			if (maxSelect === -1 || selected.length < maxSelect) {
				newSelected = [...selected, value]
			} else {
				newSelected = selected
			}
		}
		setSelected(newSelected)
		if (onChange) {
			onChange(newSelected)
		}
	}

	return (
		<div className={`pill-selector ${columns ? `columns-${columns}` : ''}`}>
			{items.map((item) => (
				<div
					key={item.value.join(',')}
					className={`pill-item ${selected.includes(item.value.join(',')) ? 'selected' : ''}`}
					onClick={() => handleClick(item.value.join(','))}
				>
					{item.name}
				</div>
			))}
		</div>
	)
}

export default PillSelector
