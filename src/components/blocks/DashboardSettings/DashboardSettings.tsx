import { DiscordConnectButton } from '@/components/elements/DiscordConnectButton/DiscordConnectButton'
import { auth } from '@/lib/auth'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DashboardSettings.module.scss'
import { DonationStatus } from './DonationStatus/DonationStatus'

export const DashboardSettings = async () => {
	const session = await auth()
	if (!session || !session.user) return null

	const meEndpointUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`
	const response = await fetch(meEndpointUrl, { cache: 'no-cache', headers: { Authorization: `Bearer ${session.user.jwt}` } })
	const data = await response.json()

	const isDiscordConnected = !!data.discordId
	const discordUsername = data.discordUsername
	const discordAvatar = data.discordAvatar
	const discordId = data.discordId

	return (
		<div className={styles.DashboardSettings}>
			<div className={styles.section}>
				<div className={styles.sectionHeader}>
					<div>
						<h3>
							<FontAwesomeIcon icon={faDollarSign} className={styles.sectionIcon} /> <span>Donation & Sponsorship Status</span>
						</h3>
						<p>Manage your support and access exclusive member benefits.</p>
					</div>
					<br />
					<DonationStatus
						donationTier={data.donationTier}
						donationAmount={data.donationAmount}
						donationFrequency={data.donationFrequency}
						donationStatus={data.donationStatus}
						sponsorStatus={data.sponsorStatus}
						sponsorTier={data.sponsorTier}
						donationUpdatedAt={data.donationUpdatedAt}
					/>
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles.sectionHeader}>
					<div>
						<h3>
							<FontAwesomeIcon icon={faDiscord} className={styles.discordLogo} />
							<span>Discord Integration</span>
						</h3>
						<p>Connect your Discord account to access exclusive channels and roles in our community server.</p>
					</div>
				</div>
				<DiscordConnectButton
					isConnected={isDiscordConnected}
					discordUsername={discordUsername}
					discordAvatar={discordAvatar}
					discordId={discordId}
				/>
			</div>
		</div>
	)
}
