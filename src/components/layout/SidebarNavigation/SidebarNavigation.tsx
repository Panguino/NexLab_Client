'use client'
import { useRootStore } from '@/store/useRootStore'
import styles from './SidebarNavigation.module.scss'

interface SidebarNavigationProps {
	children: React.ReactNode
}

const SidebarNavigation = ({ children }: SidebarNavigationProps) => {
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const hideSidebar = hazardMapFullScreen
	return <div className={`${styles.SidebarNavigation} ${hideSidebar ? styles.hide : ''} `}>{children}</div>
}

export default SidebarNavigation
