import { ComingSoon } from '@/components/blocks/PageBlocks/ComingSoon/ComingSoon'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = () => {
	return (
		<PageContentWrapper>
			<ComingSoon
				pageName="Storm Chasing Gallery"
				purpose="Curated photos and video highlights from our field seasons, trips, and alumni."
				etaText="First releases planned for early 2026. Check back for updates."
			/>
		</PageContentWrapper>
	)
}

export default Page
