import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const code = searchParams.get('code')
	const state = searchParams.get('state')

	if (!code || !state) {
		return NextResponse.redirect(new URL('/dashboard?error=discord_auth_failed', req.url))
	}

	// Get fresh session
	const session = await auth()
	if (!session?.user?.jwt) {
		return NextResponse.redirect(new URL('/dashboard?error=session_expired', req.url))
	}

	const freshJWT = session.user.jwt

	try {
		// Exchange code for Discord access token
		const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
				client_secret: process.env.DISCORD_CLIENT_SECRET!,
				grant_type: 'authorization_code',
				code,
				redirect_uri: `${process.env.NEXTAUTH_URL}/api/discord/callback`,
			}),
		})

		const tokenData = await tokenResponse.json()
		if (tokenData.error) {
			return NextResponse.redirect(new URL('/dashboard?error=discord_token_failed', req.url))
		}

		// Get Discord user info
		const userResponse = await fetch('https://discord.com/api/users/@me', {
			headers: { Authorization: `Bearer ${tokenData.access_token}` },
		})
		const discordUser = await userResponse.json()

		console.log('Updating Strapi user...')
		console.log('Strapi endpoint:', `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`)
		console.log('JWT being used:', freshJWT ? 'JWT present' : 'No JWT')

		// Update Strapi user with Discord info
		const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${freshJWT}`,
			},
			body: JSON.stringify({
				discordId: discordUser.id,
				discordUsername: discordUser.username,
				discordAvatar: discordUser.avatar,
				discordConnectedAt: new Date().toISOString(),
			}),
		})

		console.log('Strapi update response:', {
			ok: updateResponse.ok,
			status: updateResponse.status,
			statusText: updateResponse.statusText,
		})

		if (updateResponse.ok) {
			console.log('Strapi update successful')
			// Get user data to check for existing donation
			const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
				headers: { Authorization: `Bearer ${freshJWT}` },
			})
			const userData = await userResponse.json()

			// If user has an active donation, assign Discord role
			if (userData.donationTier && userData.donationStatus === 'active') {
				try {
					// Use the request URL to get the correct base URL
					const baseUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}`
					await fetch(`${baseUrl}/api/discord/assign-role`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							discordId: discordUser.id,
							donationTier: userData.donationTier,
						}),
					})
					console.log('Discord role assigned for existing donation')
				} catch (error) {
					console.error('Failed to assign Discord role:', error)
				}
			}

			return NextResponse.redirect(new URL('/dashboard?discord_connected=true', req.url))
		} else {
			const errorText = await updateResponse.text()
			console.error('Strapi update failed:', {
				status: updateResponse.status,
				statusText: updateResponse.statusText,
				body: errorText,
			})
			return NextResponse.redirect(new URL('/dashboard?error=discord_update_failed', req.url))
		}
	} catch (error) {
		console.error('Discord connection error:', error)
		return NextResponse.redirect(new URL('/dashboard?error=discord_connection_failed', req.url))
	}
}
