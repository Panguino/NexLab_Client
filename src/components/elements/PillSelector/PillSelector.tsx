import React, { useState } from 'react'
import styles from './PillSelector.module.scss'

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
			if (maxSelect === 1) {
				newSelected = [value]
			} else if (maxSelect === -1 || selected.length < maxSelect) {
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
		<div className={`${styles.pillSelector} ${columns ? styles[`columns-${columns}`] : ''}`}>
			{items.map((item) => (
				<div className={styles.pillItemWrapper} key={item.value.join(',')}>
					<div
						key={item.value.join(',')}
						className={`${styles.pillItem} ${selected.includes(item.value.join(',')) ? styles.pillItemSelected : ''}`}
						onClick={() => handleClick(item.value.join(','))}
					>
						{item.name}
					</div>
				</div>
			))}
		</div>
	)
}

export default PillSelector
