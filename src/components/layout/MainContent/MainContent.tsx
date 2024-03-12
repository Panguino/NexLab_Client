'use client'

import styles from './MainContent.module.scss'

const MainContent = ({ children }) => {
	return (
		<div className={styles.MainContentWrapper}>
			<div className={styles.CenterContent}>{children}</div>
		</div>
	)
}

export default MainContent
