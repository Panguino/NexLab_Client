import styles from './SidebarGroup.module.scss'

export const SidebarGroup = ({ title, children, styleType = 'default' }) => {
	return (
		<div className={`${styles.SidebarGroup} ${styleType === 'dot' ? styles.withDot : ''}`}>
			<div className={styles.title}>{title}</div>
			{children}
		</div>
	)
}
