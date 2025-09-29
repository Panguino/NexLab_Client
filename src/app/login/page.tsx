import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

import { Login } from '@/components/blocks/Login/Login'

const Page = async () => {
	const session = await auth()
	if (session && session.user) {
		redirect('/dashboard')
	}
	return <Login />
}

export default Page
