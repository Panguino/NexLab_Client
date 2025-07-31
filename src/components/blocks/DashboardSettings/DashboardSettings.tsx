import { DiscordConnectButton } from '@/components/elements/DiscordConnectButton/DiscordConnectButton'
import { auth } from '@/lib/auth'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DashboardSettings.module.scss'

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
							<FontAwesomeIcon icon={faDiscord} className={styles.discordLogo} /> <span>Discord Integration</span>
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

			{/* <UserSettingsForm initialValue={data.TestInfo} jwt={session.user.jwt} /> */}
		</div>
	)
}
