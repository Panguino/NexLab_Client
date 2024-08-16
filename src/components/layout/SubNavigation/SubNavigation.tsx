import React from 'react'
import styles from './SubNavigation.module.scss'

interface SubNavigationProps {
	children: React.ReactNode
}

const SubNavigation = ({ children }: SubNavigationProps) => {
	return (
		<>
			<div className={`SubNavigation ${styles.SubNavigation}`}>
				<div className={styles.NavItems}>{children}</div>
			</div>
			<div className={`SubNavigationSpacer ${styles.Spacer}`} />
		</>
	)
}

export default SubNavigation
