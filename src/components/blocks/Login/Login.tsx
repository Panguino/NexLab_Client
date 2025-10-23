import { GoogleSignInButton } from '@/components/elements/AuthButtons/AuthButtons'

import styles from './Login.module.scss'

export const Login = () => {
	return (
		<div className={styles.Login}>
			<div className={styles.container}>
				<div className={styles.loginCard}>
					<div className={styles.header}>
						<div className={styles.logoSection}>
							<img src="/img/logo-cloud-filled.svg" alt="NexLab" className={styles.logo} />
							<h1 className={styles.title}>Welcome to NexLab</h1>
							<p className={styles.subtitle}>Sign in to access your weather dashboard</p>
						</div>
					</div>

					<div className={styles.authSection}>
						<div className={styles.authButtons}>
							<GoogleSignInButton />
						</div>
					</div>

					<div className={styles.footer}>
						<p>By signing in, you agree to our terms of service and privacy policy.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
