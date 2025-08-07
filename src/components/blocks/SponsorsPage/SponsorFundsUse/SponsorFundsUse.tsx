import styles from './SponsorFundsUse.module.scss'

export const SponsorFundsUse = () => {
	return (
		<section className={styles.howFundsUsed}>
			<div className={styles.container}>
				<h2>How Your Sponsorship Helps</h2>
				<p>
					Every sponsorship dollar directly supports our mission to advance weather science and education. Here's how we put your investment
					to work:
				</p>

				<ul>
					<li>
						<strong>Infrastructure & Hosting</strong>
						Maintaining high-performance servers and data delivery systems to ensure 24/7 availability of critical weather data.
					</li>
					<li>
						<strong>Research & Development</strong>
						Funding new features, data sources, and analytical tools that benefit the entire meteorological community.
					</li>
					<li>
						<strong>Educational Content</strong>
						Creating tutorials, documentation, and training materials to help users maximize the platform's potential.
					</li>
					<li>
						<strong>Data Acquisition</strong>
						Licensing premium weather datasets and maintaining partnerships with meteorological organizations worldwide.
					</li>
					<li>
						<strong>Community Support</strong>
						Providing technical support, hosting events, and maintaining active engagement with our user community.
					</li>
					<li>
						<strong>Open Source Initiatives</strong>
						Contributing to open-source weather tools and making meteorological data more accessible to researchers globally.
					</li>
				</ul>
			</div>
		</section>
	)
}
