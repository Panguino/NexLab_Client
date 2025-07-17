import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Footer } from '../PageBlocks/Footer/Footer'
import { DonationHero } from './DonationHero/DonationHero'
import styles from './DonationPage.module.scss'
import { DonationPerks } from './DonationPerks/DonationPerks'
import { DonationTiers } from './DonationTiers/DonationTiers'
import { DonationUse } from './DonationUse/DonationUse'
import { SponsorshipInfo } from './SponsorshipInfo/SponsorshipInfo'
import { TestimonialsSection } from './TestimonialsSection/TestimonialsSection'

export const DonationPage = () => {
	return (
		<ScrollArea>
			<div className={styles.donationPage}>
				<DonationHero />
				<DonationPerks />
				<DonationUse />
				<DonationTiers />
				<SponsorshipInfo />
				<TestimonialsSection />
			</div>
			<Footer />
		</ScrollArea>
	)
}
