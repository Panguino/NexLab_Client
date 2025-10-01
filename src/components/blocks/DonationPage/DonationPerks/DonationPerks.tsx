'use client'

import { Button } from '@/components/elements/Button/Button'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DonationPerks.module.scss'

export const DonationPerks = () => {
	const perks = [
		{
			title: 'Exclusive Donator Role',
			description: 'This role gives donors a special badge on both the website and Discord.',
		},
		{
			title: 'Private Discord Channels',
			description: 'A space to preview upcoming features, provide feedback, and suggest new ideas.',
		},
		{
			title: 'Premium Tool Access',
			description:
				'Priority access to advanced versions of tools, such as expanded model/data comparison options and increased saved/favorite limits.',
		},
	]

	return (
		<section className={styles.perks}>
			<div className={styles.perksInner}>
				<div className={styles.perksContent}>
					<h2>Perks of making a donation</h2>
					<p>
						By giving to Nexlab, you keep vital weather data and analysis tools free for millions of researchers, educators, storm
						chasers, and hobbyists worldwide. Your support not only sustains open weather resources but also deepens your involvement with
						Nexlab's mission. As a token of our gratitude, each donor unlocks benefits such as:
					</p>
					<ul className={styles.perksList}>
						{perks.map((perk, index) => (
							<li key={index} className={styles.perkItem}>
								<span className={styles.perkCheckMark}>
									<FontAwesomeIcon icon={faCheck} />
								</span>
								<span>
									<strong>{perk.title}:</strong> {perk.description}
								</span>
							</li>
						))}
					</ul>
					<div className={styles.perksButton}>
						<Button label="Make a Donation" link="#donation-tiers" target="_self" />
					</div>
				</div>
				<div className={styles.perksImage}>
					<img
						src="https://s3.amazonaws.com/screenshotsandvideos/ShareX/2025/07/opera_2025-07-30_13-08-01.png"
						alt="Weather perks illustration"
					/>
				</div>
			</div>
		</section>
	)
}
