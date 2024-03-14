import { FacebookSignInButton, GoogleSignInButton } from '@/components/elements/AuthButtons/AuthButtons'

import styles from './Login.module.scss'

export const Login = () => {
	return (
		<div className={styles.Login}>
			<div className={styles.box}>
				<h1>Log in</h1>
				<GoogleSignInButton />
				<FacebookSignInButton />
			</div>
		</div>
	)
}
