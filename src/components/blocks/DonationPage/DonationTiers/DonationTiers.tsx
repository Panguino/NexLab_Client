'use client'

import { Button } from '@/components/elements/Button/Button'
import { useState } from 'react'
import styles from './DonationTiers.module.scss'

interface DonationTiersProps {
	onOpenModal: (amount: number, oneTime: boolean, tier: string) => void
}

export const DonationTiers = ({ onOpenModal }: DonationTiersProps) => {
	const donationAmounts = [10, 25, 50, 100, 500]
	const [selectedAmount, setSelectedAmount] = useState<number>(25)
	const [isRecurring, setIsRecurring] = useState<boolean>(false)

	const handleSubmit = () => {
		onOpenModal(selectedAmount, !isRecurring, '')
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const amount = parseInt(e.target.value)
		setSelectedAmount(amount)
		// Disable recurring if amount is over $50
		if (amount > 50 && isRecurring) {
			setIsRecurring(false)
		}
	}

	const handleRecurringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsRecurring(e.target.checked)
	}

	// Features array preserved for future use
	/* const features = [
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
	] */

	return (
		<section className={styles.donationTiers} id="donation-tiers">
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Become a donating Member</h2>
					<p className={styles.betaNotice}>
						NexLab is <span className={styles.highlight}>currently in beta</span>, and we're grateful for your support during this
						exciting phase of development. As we continue to refine our platform and expand our features,{' '}
						<span className={styles.highlight}>donation perks, pricing, and access levels may evolve</span>. We're committed to delivering
						exceptional value to our donors and appreciate your understanding as we optimize the experience. Your contribution today
						directly supports the development of cutting-edge weather tools and ensures free access to vital data for the entire
						community.
					</p>
				</div>

				<div className={styles.donationFormWrapper}>
					<div className={styles.donationForm}>
						<div className={styles.formGroup}>
							<label htmlFor="donation-amount" className={styles.label}>
								Select Donation Amount
							</label>
							<select id="donation-amount" value={selectedAmount} onChange={handleAmountChange} className={styles.select}>
								{donationAmounts.map((amount) => (
									<option key={amount} value={amount}>
										${amount}
									</option>
								))}
							</select>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.checkboxLabel}>
								<input
									type="checkbox"
									checked={isRecurring}
									onChange={handleRecurringChange}
									disabled={selectedAmount > 50}
									className={styles.checkbox}
								/>
								<span className={styles.checkboxText}>
									Make this a recurring monthly donation
									{selectedAmount > 50 && <span className={styles.disabledNote}> (not available for amounts over $50)</span>}
								</span>
							</label>
						</div>

						<div className={styles.submitGroup}>
							<Button label="Submit Your Donation" onClick={handleSubmit} className={styles.submitButton} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
