'use client'
import styles from './LogStatus.module.scss'
import { signOut } from 'next-auth/react'

const LogStatus = ({ email }) => {
	return (
		<div className={styles.info}>
			Signed in as {email} | <button onClick={() => signOut()}>Log out</button>
		</div>
	)
}

export default LogStatus
