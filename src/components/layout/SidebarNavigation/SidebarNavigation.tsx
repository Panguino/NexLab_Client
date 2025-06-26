'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRootStore } from '@/store/useRootStore'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import styles from './SidebarNavigation.module.scss'

interface SidebarNavigationProps {
	children: React.ReactNode
}

const SidebarNavigation = ({ children }: SidebarNavigationProps) => {
	const { isMobile } = useIsMobile()
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const satradMapFullScreen = useRootStore.use.satradMapFullScreen()
	const nexradMapFullScreen = useRootStore.use.nexradMapFullScreen()
	const forecastMapFullScreen = useRootStore.use.forecastMapFullScreen()
	const analysisMapFullScreen = useRootStore.use.analysisMapFullScreen()
	const mobileSidebarMenuIsOpen = useRootStore.use.mobileSidebarMenuIsOpen()
	const closeMobileSidebarMenu = useRootStore.use.closeMobileSidebarMenu()
	const hideSidebar = hazardMapFullScreen || satradMapFullScreen || nexradMapFullScreen || forecastMapFullScreen || analysisMapFullScreen
	const pathname = usePathname()

	useEffect(() => {
		closeMobileSidebarMenu()
	}, [pathname, closeMobileSidebarMenu])

	return (
		<div
			className={`${styles.SidebarNavigation} ${hideSidebar ? styles.hide : ''}`}
			style={{ transform: !isMobile || mobileSidebarMenuIsOpen ? 'translateX(0)' : 'translateX(-100%)' }}
		>
			{children}
		</div>
	)
}

export default SidebarNavigation
