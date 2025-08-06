'use client'

import { Button } from '@/components/elements/Button/Button'
import { faAward, faCode, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './SponsorshipInfo.module.scss'

export const SponsorshipInfo = () => {
	const benefits = [
		{
			icon: faEye,
			title: 'Prominent Logo Placement',
			description: 'Showcase your brand across our high-traffic platform—on the site footer, data views, and sponsor page.',
		},
		{
			icon: faCode,
			title: 'Custom Feature & API Collaboration',
			description: 'Work with our team to develop integrations or tools tailored to your needs, while supporting the wider community.',
		},
		{
			icon: faAward,
			title: 'Premium Recognition',
			description:
				'Featured as a key supporter in our annual impact report, on the sponsors page, and in select communications—demonstrating your commitment to open weather data.',
		},
	]

	return (
		<section className={styles.sponsorship}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Looking to Sponsor?</h2>
					<p>
						If individual donations aren't the right fit for your organization or you're ready to make a larger impact, consider
						sponsoring NexLab Weather. Partner with us and have your brand seen by millions of users who rely on our free data and tools
						every day.
					</p>
				</div>

				<div className={styles.benefitsList}>
					{benefits.map((benefit, index) => (
						<div key={index} className={styles.benefitItem}>
							<div className={styles.benefitIcon}>
								<FontAwesomeIcon icon={benefit.icon} />
							</div>
							<div className={styles.benefitContent}>
								<h4>{benefit.title}</h4>
								<p>{benefit.description}</p>
							</div>
						</div>
					))}
				</div>

				<div className={styles.cta}>
					<Button label="Explore Sponsorship Opportunities" link="/donate/sponsors" target="_self" />
				</div>
			</div>
		</section>
	)
}
