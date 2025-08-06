'use client'

import { Button } from '@/components/elements/Button/Button'
import { faCrown, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DonationStatus.module.scss'

interface DonationStatusProps {
	donationTier?: string
	donationAmount?: number
	donationFrequency?: 'monthly' | 'lifetime'
	donationStatus?: 'active' | 'cancelled' | 'expired'
	sponsorStatus?: boolean
	sponsorTier?: string
	donationUpdatedAt?: string
}

export const DonationStatus = ({
	donationTier,
	donationAmount,
	donationFrequency,
	donationStatus,
	sponsorStatus,
	sponsorTier,
	donationUpdatedAt,
}: DonationStatusProps) => {
	const getTierColor = (tier?: string) => {
		switch (tier?.toLowerCase()) {
			case 'standard':
				return '#22c55e'
			case 'advanced':
				return '#3b82f6'
			case 'premium':
				return '#a855f7'
			default:
				return '#6b7280'
		}
	}

	const renderDonationStatus = () => {
		if (!donationTier || donationStatus !== 'active') {
			return (
				<div className={styles.noDonation}>
					<div className={styles.statusContent}>
						<h4>
							<span>No Active Donation</span>
						</h4>
						<p>Support NexLab Weather and unlock exclusive features by becoming a donating member.</p>
						<Button label="Make a Donation" link="/donate" className={styles.loginButton} />
					</div>
				</div>
			)
		}

		const formatDate = (dateString?: string) => {
			if (!dateString) return null
			const date = new Date(dateString)
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			})
		}

		return (
			<div className={styles.activeDonation}>
				<div className={styles.statusIcon} style={{ color: getTierColor(donationTier) }}>
					<FontAwesomeIcon icon={faCrown} />
				</div>
				<div className={styles.statusContent}>
					<h4>
						{donationTier} Member
						<span className={styles.statusBadge} style={{ backgroundColor: getTierColor(donationTier) }}>
							Active
						</span>
					</h4>
					<p>
						${donationAmount} {donationFrequency === 'monthly' ? '/ month' : 'lifetime'}{' '}
						{donationUpdatedAt && <span className={styles.lastUpdated}>Last updated: {formatDate(donationUpdatedAt)}</span>}
					</p>

					<div className={styles.manageDonation}>
						<p className={styles.manageText}>
							To modify or cancel your donation
							<br />
							please contact{' '}
							<a href="mailto:foundation@codfound.org" className={styles.emailLink}>
								<FontAwesomeIcon icon={faEnvelope} />
								foundation@codfound.org
							</a>
						</p>
					</div>
				</div>
			</div>
		)
	}

	const renderSponsorStatus = () => {
		if (!sponsorStatus) return null

		return (
			<div className={styles.sponsorStatus}>
				<div className={styles.statusIcon}>
					<FontAwesomeIcon icon={faCrown} />
				</div>
				<div className={styles.statusContent}>
					<h4>
						{sponsorTier || 'Corporate'} Sponsor
						<span className={styles.statusBadge} style={{ backgroundColor: '#f59e0b' }}>
							Active
						</span>
					</h4>
					<p>Thank you for your corporate sponsorship support!</p>
				</div>
			</div>
		)
	}

	return (
		<>
			{renderSponsorStatus()}
			{renderDonationStatus()}
		</>
	)
}
