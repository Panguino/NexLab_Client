'use client'

import { Button } from '@/components/elements/Button/Button'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faCrown, faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DonationPerks.module.scss'

export const DonationPerks = () => {
	const perks = [
		{
			icon: faCrown,
			title: 'Exclusive Donator Role',
			description: 'This role gives donors a special badge on both the website and Discord.',
		},
		{
			icon: faDiscord,
			title: 'Private Discord Channels',
			description: 'A space to preview upcoming features, provide feedback, and suggest new ideas.',
		},
		{
			icon: faTools,
			title: 'Premium Tool Access',
			description:
				'Priority access to advanced versions of tools, such as expanded model/data comparison options and increased saved/favorite limits.',
		},
	]

	return (
		<section className={styles.perks}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Perks of making a donation</h2>
					<p>
						By giving to Nexlab, you keep vital weather data and analysis tools free for millions of researchers, educators, storm
						chasers, and hobbyists worldwide. Your support not only sustains open weather resources but also deepens your involvement with
						Nexlab's mission. As a token of our gratitude, each donor unlocks benefits across several categories—Community & Recognition
						some of which are:
					</p>
				</div>

				<div className={styles.perksList}>
					{perks.map((perk, index) => (
						<div key={index} className={styles.perkCard}>
							<div className={styles.perkIcon}>
								<FontAwesomeIcon icon={perk.icon} />
							</div>
							<h4>{perk.title}</h4>
							<p>{perk.description}</p>
						</div>
					))}
				</div>

				<div className={styles.cta}>
					<Button label="Full Breakdown" link="/donate#tiers" target="_self" />
				</div>
			</div>
		</section>
	)
}
