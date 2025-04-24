'use client'
import { useRootStore } from '@/store/useRootStore'
import React from 'react'
import styles from './SubNavigation.module.scss'

interface SubNavigationProps {
	children: React.ReactNode
}

const SubNavigation = ({ children }: SubNavigationProps) => {
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const hideSubNavigation = hazardMapFullScreen
	return (
		<>
			<div className={`SubNavigation ${styles.SubNavigation} ${hideSubNavigation ? styles.hide : ''}`}>
				<div className={styles.NavItems}>{children}</div>
			</div>
			<div className={`SubNavigationSpacer ${styles.Spacer} ${hideSubNavigation ? styles.hide : ''}`} />
		</>
	)
}

export default SubNavigation
