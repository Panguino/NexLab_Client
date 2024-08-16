import styles from './SidebarNavigation.module.scss'

interface SidebarNavigationProps {
	children: React.ReactNode
}

const SidebarNavigation = ({ children }: SidebarNavigationProps) => {
	return <div className={styles.SidebarNavigation}>{children}</div>
}

export default SidebarNavigation
