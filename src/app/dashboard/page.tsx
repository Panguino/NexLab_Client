import { DashboardSettings } from '@/components/blocks/DashboardSettings/DashboardSettings'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Page = async () => {
	const session = await getServerSession()
	if (!session || !session.user) {
		redirect('/login')
	}
	return (
		<PageContentWrapper>
			<h1>Dashaboard</h1>
			<DashboardSettings />
		</PageContentWrapper>
	)
}

export default Page
