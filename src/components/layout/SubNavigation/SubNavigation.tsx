import styles from './SubNavigation.module.scss'

const SubNavigation = ({ children }) => {
	return (
		<div className={styles.SubNavigation}>
			<div className={styles.NavItems}>{children}</div>
		</div>
	)
}

export default SubNavigation
