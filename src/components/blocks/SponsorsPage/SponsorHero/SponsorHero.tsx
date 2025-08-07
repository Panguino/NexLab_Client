import { Button } from '@/components/elements/Button/Button'
import styles from './SponsorHero.module.scss'

export const SponsorHero = () => (
	<section id="sponsor-hero" className={styles.sponsorHero}>
		<div className={styles.heroInner}>
			<div className={styles.container}>
				<div className={styles.heroContent}>
					<h1>Partner with NexLab Weather</h1>
					<p>
						Support free, high-quality weather data and analysis used by millions worldwide. Sponsorship is a premium way for
						organizations to make a significant impact while gaining broad visibility and collaboration opportunities.
					</p>
					<div className={styles.heroCta}>
						<Button label="Contact Us About Sponsorship" link="mailto:sponsor@cod.edu" target="_self" />
						<Button label="Download Sponsorship Prospectus" link="/sponsors/media-kit.pdf" target="_self" />
					</div>
				</div>
			</div>
			<div className={styles.heroImage}>
				<img
					src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
					alt="Sponsor hero background"
				/>
			</div>
		</div>
	</section>
)
