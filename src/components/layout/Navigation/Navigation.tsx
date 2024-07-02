import Link from 'next/link'
import styles from './Navigation.module.scss'
import { getServerSession } from 'next-auth'
import LogStatus from '@/components/elements/LogStatus/LogStatus'
import DarkmodeToggler from '@/components/elements/DarkmodeToggler/DarkmodeToggler'

const Navigation = async () => {
	const session = await getServerSession()
	return (
		<>
			<div className={`Navigation ${styles.Navigation}`}>
				<Link href="/">
					<div className={styles.Logo}>
						<img src="/img/logo-cloud-filled.svg" />
						<img src="/img/logo-text.svg" />
					</div>
				</Link>
				<div className={styles.NavItems}>
					<Link href="/weather-data/">
						<div className={styles.NavItem}>Weather Data</div>
					</Link>
					<Link href="/academics/">
						<div className={styles.NavItem}>Academics</div>
					</Link>
					<Link href="/chasing/">
						<div className={styles.NavItem}>Storm Chasing</div>
					</Link>
					<Link href="/localwx/">
						<div className={styles.NavItem}>Local Weather</div>
					</Link>
					<Link href="/faqs/">
						<div className={styles.NavItem}>FAQs</div>
					</Link>
				</div>
				<div className={styles.NavItems}>
					<DarkmodeToggler />
					{session?.user?.email ? (
						<LogStatus email={session?.user?.email} />
					) : (
						<Link href="/login/">
							<div className={styles.NavItemButton}>Login</div>
						</Link>
					)}
				</div>
			</div>
			<div className={`NavigationSpacer ${styles.Spacer}`} />
		</>
	)
}

export default Navigation
