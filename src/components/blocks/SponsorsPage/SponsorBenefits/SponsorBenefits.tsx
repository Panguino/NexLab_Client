import { faChartLine, faEye, faHandshake, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SponsorBenefits.module.scss'

export const SponsorBenefits = () => {
	return (
		<section className={styles.sponsorBenefits}>
			<div className={styles.container}>
				<h2>Sponsorship Benefits</h2>

				<div className={styles.benefitPanelGrid}>
					<div className={styles.benefitPanel}>
						<div className={styles.panelIcon}>
							<FontAwesomeIcon icon={faEye} />
						</div>
						<h3>Brand Visibility</h3>
						<ul>
							<li>
								<strong>Logo placement</strong> on our homepage and data pages
							</li>
							<li>
								<strong>Social media mentions</strong> across all platforms
							</li>
							<li>
								<strong>Newsletter features</strong> reaching 10K+ subscribers
							</li>
							<li>
								<strong>Conference presence</strong> at major meteorological events
							</li>
						</ul>
					</div>

					<div className={styles.benefitPanel}>
						<div className={styles.panelIcon}>
							<FontAwesomeIcon icon={faUsers} />
						</div>
						<h3>Community Access</h3>
						<ul>
							<li>
								<strong>Direct access</strong> to weather professionals
							</li>
							<li>
								<strong>Networking opportunities</strong> with researchers
							</li>
							<li>
								<strong>Early access</strong> to new features and data
							</li>
							<li>
								<strong>Feedback channels</strong> for product development
							</li>
						</ul>
					</div>

					<div className={styles.benefitPanel}>
						<div className={styles.panelIcon}>
							<FontAwesomeIcon icon={faChartLine} />
						</div>
						<h3>Data & Analytics</h3>
						<ul>
							<li>
								<strong>Usage analytics</strong> and engagement metrics
							</li>
							<li>
								<strong>Custom reporting</strong> on sponsorship ROI
							</li>
							<li>
								<strong>API access</strong> to our weather data
							</li>
							<li>
								<strong>Research collaboration</strong> opportunities
							</li>
						</ul>
					</div>

					<div className={styles.benefitPanel}>
						<div className={styles.panelIcon}>
							<FontAwesomeIcon icon={faHandshake} />
						</div>
						<h3>Partnership Perks</h3>
						<ul>
							<li>
								<strong>Co-marketing opportunities</strong> for events
							</li>
							<li>
								<strong>Content collaboration</strong> on educational materials
							</li>
							<li>
								<strong>Speaking opportunities</strong> at our workshops
							</li>
							<li>
								<strong>Priority support</strong> for technical needs
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
