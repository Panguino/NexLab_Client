import styles from './SidebarGroup.module.scss'

export const SidebarGroup = ({ title, children }) => {
	return (
		<div className={styles.SidebarGroup}>
			<div className={styles.title}>{title}</div>
			{children}
		</div>
	)
}
