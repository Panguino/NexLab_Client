'use client'
import { useRootStore } from '@/store/useRootStore'
import React from 'react'
import styles from './SubNavigation.module.scss'

interface SubNavigationProps {
	children: React.ReactNode
}

const SubNavigation = ({ children }: SubNavigationProps) => {
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const satradMapFullScreen = useRootStore.use.satradMapFullScreen()
	const nexradMapFullScreen = useRootStore.use.nexradMapFullScreen()
	const forecastMapFullScreen = useRootStore.use.forecastMapFullScreen()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const hideSubNavigation = hazardMapFullScreen || satradMapFullScreen || nexradMapFullScreen || forecastMapFullScreen || analysisMapFullScreen
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
