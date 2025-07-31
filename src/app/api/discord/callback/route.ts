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

		// Update Strapi user with Discord info using correct endpoint
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

		if (updateResponse.ok) {
			return NextResponse.redirect(new URL('/dashboard?discord_connected=true', req.url))
		} else {
			const errorResponse = await updateResponse.json()
			console.error('Update failed:', errorResponse)
			return NextResponse.redirect(new URL('/dashboard?error=discord_update_failed', req.url))
		}
	} catch (error) {
		console.error('Discord connection error:', error)
		return NextResponse.redirect(new URL('/dashboard?error=discord_connection_failed', req.url))
	}
}
