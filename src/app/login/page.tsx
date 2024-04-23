import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { Login } from '@/components/blocks/Login/Login'

const Page = async () => {
	const session = await getServerSession()
	if (session && session.user) {
		redirect('/dashboard')
	}
	return <Login />
}

export default Page
