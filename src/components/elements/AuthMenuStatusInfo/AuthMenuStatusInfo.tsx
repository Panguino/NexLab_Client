import LogStatus from '@/components/elements/LogStatus/LogStatus'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import styles from './AuthMenuStatusInfo.module.scss'

const AuthMenuStatusInfo = async () => {
	const session = await getServerSession()
	return (
		<>
			{session?.user?.email ? (
				<LogStatus email={session?.user?.email} />
			) : (
				<Link href="/login/">
					<div className={styles.NavItemButton}>Login</div>
				</Link>
			)}
		</>
	)
}

export default AuthMenuStatusInfo
