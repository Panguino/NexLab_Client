'use client'

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import styles from './AuthButtons.module.scss'

export function GoogleSignInButton() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	const handleClick = () => {
		signIn('google', { callbackUrl })
	}

	return (
		<button onClick={handleClick} className={`${styles.authButton} ${styles.googleButton}`}>
			<FontAwesomeIcon icon={faGoogle} />
			<span>Sign in with Google</span>
		</button>
	)
}
export function FacebookSignInButton() {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	const handleClick = () => {
		signIn('facebook', { callbackUrl })
	}

	return (
		<button onClick={handleClick} className={`${styles.authButton} ${styles.facebookButton}`}>
			<FontAwesomeIcon icon={faFacebook} />
			<span>Sign in with Facebook</span>
		</button>
	)
}
