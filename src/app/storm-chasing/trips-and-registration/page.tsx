import { ComingSoon } from '@/components/blocks/PageBlocks/ComingSoon/ComingSoon'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = () => {
	return (
		<PageContentWrapper>
			<ComingSoon
				pageName="Storm Chasing Trips & Registration"
				purpose="Trip details, dates, pricing, and online registration for guided storm chasing experiences."
				etaText="Registration opens early 2026. Check back for updates."
			/>
		</PageContentWrapper>
	)
}

export default Page
