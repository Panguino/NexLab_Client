import styles from './SidebarWrapper.module.scss'

const SidebarWrapper = ({ children }) => {
	return <div className={styles.SidebarWrapper}>{children}</div>
}

export default SidebarWrapper
