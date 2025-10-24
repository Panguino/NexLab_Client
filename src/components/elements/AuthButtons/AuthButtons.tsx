'use client'

import { faGoogle } from '@fortawesome/free-brands-svg-icons'
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
