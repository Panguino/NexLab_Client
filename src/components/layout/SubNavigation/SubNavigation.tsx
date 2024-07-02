import styles from './SubNavigation.module.scss'

const SubNavigation = ({ children }) => {
	return (
		<>
			<div className={`SubNavigation ${styles.SubNavigation}`}>
				<div className={styles.NavItems}>{children}</div>
			</div>
			<div className={`SubNavigationSpacer ${styles.Spacer}`} />
		</>
	)
}

export default SubNavigation
