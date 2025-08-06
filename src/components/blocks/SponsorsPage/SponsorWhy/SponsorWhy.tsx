import styles from './SponsorWhy.module.scss'

export const SponsorWhy = () => {
	return (
		<section className={styles.sponsorWhy}>
			<div className={styles.container}>
				<h2>Why Sponsor NexLab?</h2>
				<p>
					Support cutting-edge weather research and education while gaining valuable exposure to the meteorological community. Your
					sponsorship helps advance weather science and connects you with passionate weather enthusiasts.
				</p>
				<div className={styles.metricsGrid}>
					<div className={styles.metric}>
						<strong>50K+</strong>
						<span>Monthly Users</span>
					</div>
					<div className={styles.metric}>
						<strong>15K+</strong>
						<span>Social Followers</span>
					</div>
					<div className={styles.metric}>
						<strong>500+</strong>
						<span>Research Citations</span>
					</div>
					<div className={styles.metric}>
						<strong>24/7</strong>
						<span>Data Access</span>
					</div>
				</div>
			</div>
		</section>
	)
}
