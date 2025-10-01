import styles from './CurrentSponsors.module.scss'

export const CurrentSponsors = () => {
	return (
		<section className={styles.currentSponsors}>
			<div className={styles.container}>
				<h2>Our Current Sponsors</h2>

				<div className={styles.logoWall}>
					<img src="https://upload.wikimedia.org/wikipedia/commons/7/79/NOAA_logo.svg" alt="NOAA" />
					<img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google Weather" />
					<img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Weather" />
					<img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft Weather" />
				</div>

				<div className={styles.sponsorTestimonials}>
					<div className={styles.testimonialItem}>
						<blockquote>
							"Partnering with NexLab has given us incredible visibility in the meteorological community. Their platform reaches exactly
							the audience we want to connect with."
							<cite>— Sarah Johnson, Marketing Director, WeatherTech Solutions</cite>
						</blockquote>
					</div>

					<div className={styles.testimonialItem}>
						<blockquote>
							"The data insights and community engagement we've gained through our NexLab sponsorship have been invaluable for our
							product development."
							<cite>— Dr. Michael Chen, CTO, AtmosData Inc.</cite>
						</blockquote>
					</div>

					<div className={styles.testimonialItem}>
						<blockquote>
							"NexLab's professional approach and dedicated user base make them an ideal partner for companies serious about weather
							technology."
							<cite>— Lisa Rodriguez, VP Marketing, StormTracker Pro</cite>
						</blockquote>
					</div>
				</div>
			</div>
		</section>
	)
}
