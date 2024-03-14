'use client'

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'

export function GoogleSignInButton() {
	const handleClick = () => {
		signIn('google')
	}

	return (
		<button onClick={handleClick}>
			<FontAwesomeIcon icon={faGoogle} />
			<span> with Google</span>
		</button>
	)
}
export function FacebookSignInButton() {
	const handleClick = () => {
		signIn('facebook')
	}

	return (
		<button onClick={handleClick}>
			<FontAwesomeIcon icon={faFacebook} />
			<span> with Facebook</span>
		</button>
	)
}
