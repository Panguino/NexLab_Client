import styles from './SidebarNavigation.module.scss'

const SidebarNavigation = ({ children }) => {
	return <div className={styles.SidebarNavigation}>{children}</div>
}

export default SidebarNavigation
