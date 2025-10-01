'use client'

import { faBolt, faServer, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DonationUse.module.scss'

export const DonationUse = () => {
	const useCases = [
		{
			icon: faUsers,
			title: 'Sustaining Our Dedicated Team of Weather Experts',
			description:
				'NexLab Weather is powered by a small, dedicated team of part-time staff members who handle everything from development to maintenance and support. Donations directly contribute to covering their time and efforts, allowing us to continue providing high-quality weather tools and keeping up with community needs.',
		},
		{
			icon: faServer,
			title: 'Hosting, Technology, and Infrastructure Costs',
			description:
				'Running a weather data platform with thousands of daily users requires reliable, high-performance servers and resources. Donations will help us maintain and scale our hosting infrastructure, ensuring data remains accessible and tools run smoothly. These funds also allow us to upgrade equipment and computing resources as needed to handle the demands of our growing community.',
		},
		{
			icon: faBolt,
			title: 'Continued Innovation and Expansion',
			description:
				'Beyond upkeep, donations will enable us to pursue ambitious updates and enhancements, including the full UI/UX rebrand, new tool development, and potential open-source contributions to weather data solutions. Your support keeps us innovating and empowers NexLab Weather to evolve for a broader audience.',
		},
	]

	return (
		<section className={styles.donationUse}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Planned use of donations</h2>
					<p>
						Help us continue delivering reliable weather data and tools—completely free—by becoming a donating member. Your support
						ensures we can maintain infrastructure, compensate our expert team, and innovate new features. Thank you for considering a
						gift that benefits millions worldwide.
					</p>
				</div>

				<div className={styles.useCaseGrid}>
					{useCases.map((useCase, index) => (
						<div key={index} className={styles.useCasePanel}>
							<div className={styles.panelIcon}>
								<FontAwesomeIcon icon={useCase.icon} />
							</div>
							<h4>{useCase.title}</h4>
							<p>{useCase.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
