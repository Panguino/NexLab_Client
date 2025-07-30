import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '../PageBlocks/Footer/Footer'
import { CurrentSponsors } from './CurrentSponsors/CurrentSponsors'
import { SponsorBenefits } from './SponsorBenefits/SponsorBenefits'
import { SponsorFundsUse } from './SponsorFundsUse/SponsorFundsUse'
import { SponsorHero } from './SponsorHero/SponsorHero'
import { SponsorWhy } from './SponsorWhy/SponsorWhy'

export const SponsorsPage = () => {
	return (
		<ScrollArea>
			<SponsorHero />
			<SponsorWhy />
			<SponsorBenefits />
			<CurrentSponsors />
			<SponsorFundsUse />
			<Footer />
		</ScrollArea>
	)
}
