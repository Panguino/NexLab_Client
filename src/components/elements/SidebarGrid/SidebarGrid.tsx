import React, { useState } from 'react'
import styles from './SidebarGrid.module.scss'

interface IOption {
	name: string
	value: any
}

export interface ISidebarGridProps {
	selection: IOption[]
	selected?: IOption[]
	columns?: number
	onChange?: (selected: IOption) => void
}

const SidebarGrid: React.FC<ISidebarGridProps> = ({ selection, selected = [], columns = 4, onChange }) => {
	const [currentSelection, setCurrentSelection] = useState<IOption[]>(selected)

	const handleSelection = (option: IOption) => {
		setCurrentSelection([option])
		if (onChange) {
			onChange(option)
		}
	}

	return (
		<div className={styles.SidebarGrid}>
			<div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
				{selection.map((option) => (
					<div
						key={option.value}
						className={`${styles.option} ${currentSelection.includes(option) ? styles.selected : ''}`}
						onClick={() => handleSelection(option)}
					>
						{option.name}
					</div>
				))}
			</div>
		</div>
	)
}

export default SidebarGrid
