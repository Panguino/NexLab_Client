import React from 'react'
import styles from './SidebarGrid.module.scss'

export interface ISidebarGridProps {
	columns?: number
	children?: React.ReactNode
}

const SidebarGrid: React.FC<ISidebarGridProps> = ({ columns = 4, children }) => {
	return (
		<div className={styles.SidebarGrid}>
			<div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
				{children}
			</div>
		</div>
	)
}

export default SidebarGrid
