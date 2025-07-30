'use client'

import { Button } from '@/components/elements/Button/Button'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { DonationFormModal } from '../DonationFormModal/DonationFormModal'
import styles from './DonationTiers.module.scss'

export const DonationTiers = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedAmount, setSelectedAmount] = useState<number>(0)
	const [selectedTier, setSelectedTier] = useState<string>('')
	const [oneTimeDonation, setOneTimeDonation] = useState(false)

	const openModal = (amount: number, oneTime: boolean, tier: string) => {
		setOneTimeDonation(oneTime)
		setSelectedTier(tier)
		setSelectedAmount(amount)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedAmount(0)
	}

	const tiers = [
		{
			name: 'Standard',
			price: '$5/mo or $100 lifetime',
			highlight: false,
			monthlyAmount: 5,
			lifetimeAmount: 100,
		},
		{
			name: 'Advanced',
			price: '$25/mo or $250 lifetime',
			highlight: true,
			monthlyAmount: 25,
			lifetimeAmount: 250,
		},
		{
			name: 'Premium',
			price: '$50/mo or $1,000 lifetime',
			highlight: false,
			monthlyAmount: 50,
			lifetimeAmount: 1000,
		},
	]

	const features = [
		{ name: 'Acknowledgement on Donor Wall', standard: true, advanced: true, premium: true },
		{ name: 'Donor Badge (site & Discord)', standard: true, advanced: true, premium: true },
		{ name: 'Private Discord Channels', standard: true, advanced: true, premium: true },
		{ name: 'Advanced Poll Participation', standard: true, advanced: true, premium: true },
		{ name: 'Prioritized Feedback with Developers', standard: false, advanced: true, premium: true },
		{ name: 'Preview Upcoming Features', standard: false, advanced: true, premium: true },
		{ name: 'Geolocation Tools', standard: true, advanced: true, premium: true },
		{ name: 'Web Alert Push Notifications', standard: true, advanced: true, premium: true },
		{ name: 'User-Defined Color Enhancements', standard: true, advanced: true, premium: true },
		{ name: 'Custom Model Comparison Tool', standard: true, advanced: true, premium: true },
		{ name: 'Dashboard – Unlimited Favorites', standard: false, advanced: true, premium: true },
		{ name: 'Distance Measurement Tool', standard: false, advanced: true, premium: true },
		{ name: 'Increased Hazards Map Refresh Frequency', standard: false, advanced: true, premium: true },
		{ name: 'Dashboard – Geolocated Selection', standard: false, advanced: false, premium: true },
		{ name: 'Save Data to Cloud', standard: false, advanced: false, premium: true },
		{ name: 'Save Animations Locally', standard: false, advanced: false, premium: true },
		{ name: 'API Access', standard: false, advanced: true, premium: true },
		{ name: 'API Polling Frequency', standard: false, advanced: 'Moderate', premium: 'Maximum' },
		{ name: 'Exclusive Data Packages', standard: false, advanced: true, premium: true },
		{ name: 'Full ECMWF', standard: '(verify)', advanced: true, premium: 'true?' },
		{ name: 'HRRR Soundings', standard: false, advanced: false, premium: true },
		{ name: 'VIP Weather Alert Feed', standard: false, advanced: false, premium: true },
		{ name: 'Monthly Donor Newsletter & Impact Insights', standard: true, advanced: true, premium: true },
	]

	const renderFeatureValue = (value: boolean | string) => {
		if (value === true) {
			return <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
		}
		if (value === false) {
			return <FontAwesomeIcon icon={faTimes} className={styles.timesIcon} />
		}
		return <span className={styles.textValue}>{value}</span>
	}

	return (
		<section className={styles.donationTiers}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Become a donating Member</h2>
				</div>

				<div className={styles.tableWrapper}>
					<table className={styles.tiersTable}>
						<thead>
							<tr>
								<th className={styles.featureHeader}>Perk / Tier</th>
								{tiers.map((tier, index) => (
									<th key={index} className={`${styles.tierHeader} ${tier.highlight ? styles.highlighted : ''}`}>
										<div className={styles.tierName}>{tier.name}</div>
										<div className={styles.tierPrice}>{tier.price}</div>
										<div className={styles.tierActions}>
											<Button
												label={`$${tier.monthlyAmount}/mo`}
												onClick={() => openModal(tier.monthlyAmount, false, tier.name)}
												className={styles.tierButton}
											/>
											<Button
												label={`$${tier.lifetimeAmount} lifetime`}
												onClick={() => openModal(tier.lifetimeAmount, true, tier.name)}
												className={styles.tierButton}
											/>
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{features.map((feature, index) => (
								<tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
									<td className={styles.featureCell}>{feature.name}</td>
									<td className={styles.valueCell}>{renderFeatureValue(feature.standard)}</td>
									<td className={`${styles.valueCell} ${styles.highlighted}`}>{renderFeatureValue(feature.advanced)}</td>
									<td className={styles.valueCell}>{renderFeatureValue(feature.premium)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<DonationFormModal
				isOpen={isModalOpen}
				onClose={closeModal}
				oneTimeDonation={oneTimeDonation}
				tier={selectedTier}
				amount={selectedAmount}
			/>
		</section>
	)
}
