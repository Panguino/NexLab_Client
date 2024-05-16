'use client'
import styles from './LogStatus.module.scss'
import { signOut } from 'next-auth/react'
import Gravitar from 'react-gravatar'

const LogStatus = ({ email }) => {
	return (
		<div className={styles.info}>
			<Gravitar email={email} size={30} /> | <button onClick={() => signOut()}>Log out</button>
		</div>
	)
}

export default LogStatus
