'use client'

import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import styles from './DiscordConnectButton.module.scss'

export const DiscordConnectButton = ({
	isConnected,
	discordUsername,
	discordAvatar,
	discordId,
}: {
	isConnected: boolean
	discordUsername?: string
	discordAvatar?: string
	discordId?: string
}) => {
	const { data: session } = useSession()
	const [isConnecting, setIsConnecting] = useState(false)
	const [isDisconnecting, setIsDisconnecting] = useState(false)

	const handleDiscordConnect = async () => {
		if (!session?.user) return

		setIsConnecting(true)

		// Get the JWT from your session endpoint
		const sessionResponse = await fetch('/api/session')
		const sessionData = await sessionResponse.json()
		const jwt = sessionData.token?.jwt

		if (!jwt) {
			console.error('No JWT found in session')
			setIsConnecting(false)
			return
		}

		const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/api/discord/callback')}&response_type=code&scope=identify%20guilds.members.read&state=${jwt}`

		window.location.href = discordAuthUrl
	}

	const handleDiscordDisconnect = async () => {
		if (!session?.user) return

		setIsDisconnecting(true)

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session.user.jwt}`,
				},
				body: JSON.stringify({
					discordId: null,
					discordUsername: null,
					discordAvatar: null,
					discordConnectedAt: null,
				}),
			})

			if (response.ok) {
				window.location.reload() // Refresh to update the UI
			} else {
				console.error('Failed to disconnect Discord')
			}
		} catch (error) {
			console.error('Error disconnecting Discord:', error)
		} finally {
			setIsDisconnecting(false)
		}
	}

	// Generate Discord avatar URL
	const getDiscordAvatarUrl = (userId: string, avatarHash: string) => {
		if (!avatarHash) {
			// Default Discord avatar based on user ID
			const defaultAvatarNumber = (parseInt(userId) >> 22) % 6
			return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
		}
		return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=64`
	}

	if (isConnected) {
		const avatarUrl = discordId && discordAvatar ? getDiscordAvatarUrl(discordId, discordAvatar) : null

		return (
			<div className={styles.connectedStatus}>
				<div className={styles.userInfo}>
					{avatarUrl ? (
						<img src={avatarUrl} alt={`${discordUsername}'s avatar`} className={styles.avatar} />
					) : (
						<FontAwesomeIcon icon={faDiscord} className={styles.discordIcon} />
					)}
					<div className={styles.userDetails}>
						<span className={styles.connectedText}>Connected as</span>
						<span className={styles.username}>{discordUsername}</span>
					</div>
				</div>
				<button onClick={handleDiscordDisconnect} disabled={isDisconnecting} className={styles.disconnectButton}>
					{isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
				</button>
			</div>
		)
	}

	return (
		<button onClick={handleDiscordConnect} disabled={isConnecting} className={styles.connectButton}>
			<FontAwesomeIcon icon={faDiscord} />
			<span>{isConnecting ? 'Connecting...' : 'Connect Discord'}</span>
		</button>
	)
}
