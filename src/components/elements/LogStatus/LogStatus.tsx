'use client'
import { signOut } from 'next-auth/react'
import Gravitar from 'react-gravatar'
import styles from './LogStatus.module.scss'

const LogStatus = ({ email }) => {
	return (
		<div className={styles.info}>
			| <Gravitar email={email} size={40} className={styles.avatar} />{' '}
			<button className={styles.NavItemButton} onClick={() => signOut()}>
				Log out
			</button>
		</div>
	)
}

export default LogStatus
