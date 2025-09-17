import { ComingSoon } from '@/components/blocks/PageBlocks/ComingSoon/ComingSoon'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = () => {
	return (
		<PageContentWrapper>
			<ComingSoon
				pageName="Storm Chasing Tracker"
				purpose="A live-updated map and telemetry feed for our storm chasing trips. Follow vehicle positions, radar overlays, and updates in near real time."
				etaText="Tracker launches with the upcoming field season."
			/>
		</PageContentWrapper>
	)
}

export default Page
