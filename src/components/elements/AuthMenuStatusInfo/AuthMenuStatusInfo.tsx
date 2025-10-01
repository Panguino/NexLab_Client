import LogStatus from '@/components/elements/LogStatus/LogStatus'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './AuthMenuStatusInfo.module.scss'

const AuthMenuStatusInfo = () => {
	const { data: session } = useSession()

	return (
		<>
			{session?.user?.email ? (
				<LogStatus email={session.user.email} />
			) : (
				<Link href="/login/">
					<div className={styles.NavItemButton}>Login</div>
				</Link>
			)}
		</>
	)
}

export default AuthMenuStatusInfo
