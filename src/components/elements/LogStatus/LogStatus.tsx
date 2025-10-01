'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Gravitar from 'react-gravatar'
import styles from './LogStatus.module.scss'

const LogStatus = ({ email }) => {
	return (
		<div className={styles.info}>
			|{' '}
			<Link href="/dashboard/">
				<Gravitar email={email} size={40} className={styles.avatar} />
			</Link>{' '}
			<button className={styles.NavItemButton} onClick={() => signOut()}>
				Log out
			</button>
		</div>
	)
}

export default LogStatus
