'use client'

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import styles from './AuthButtons.module.scss'

export function GoogleSignInButton() {
	const handleClick = () => {
		signIn('google', { callbackUrl: '/dashboard' })
	}

	return (
		<button onClick={handleClick} className={`${styles.authButton} ${styles.googleButton}`}>
			<FontAwesomeIcon icon={faGoogle} />
			<span>Sign in with Google</span>
		</button>
	)
}
export function FacebookSignInButton() {
	const handleClick = () => {
		signIn('facebook')
	}

	return (
		<button onClick={handleClick} className={`${styles.authButton} ${styles.facebookButton}`}>
			<FontAwesomeIcon icon={faFacebook} />
			<span>Sign in with Facebook</span>
		</button>
	)
}
