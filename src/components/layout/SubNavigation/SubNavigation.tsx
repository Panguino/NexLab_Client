import styles from './SubNavigation.module.scss'

const SubNavigation = ({ children }) => {
	return (
		<>
			<div className={styles.SubNavigation}>
				<div className={styles.NavItems}>{children}</div>
			</div>
			<div className={styles.Spacer} />
		</>
	)
}

export default SubNavigation
