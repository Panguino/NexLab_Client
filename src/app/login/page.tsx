import { FacebookSignInButton, GoogleSignInButton } from '@/components/elements/AuthButtons/AuthButtons'

const Page = () => {
	return (
		<div>
			<h1>Sign In</h1>
			<GoogleSignInButton />
			<FacebookSignInButton />
		</div>
	)
}

export default Page
