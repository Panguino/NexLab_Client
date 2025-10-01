import { DashboardSettings } from '@/components/blocks/DashboardSettings/DashboardSettings'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
	const session = await auth()
	if (!session || !session.user) {
		redirect('/login')
	}
	return (
		<PageContentWrapper>
			<h1>Profile Dashboard</h1>
			<DashboardSettings />
		</PageContentWrapper>
	)
}

export default Page
