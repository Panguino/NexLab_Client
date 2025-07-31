import { auth } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const code = searchParams.get('code')
	const state = searchParams.get('state')

	console.log('=== DISCORD CALLBACK DEBUG START ===')
	console.log('Environment:', process.env.NODE_ENV)
	console.log('Request URL:', req.url)
	console.log('Request params:', { code: !!code, state: !!state })
	console.log('Request host:', req.nextUrl.host)
	console.log('Request protocol:', req.nextUrl.protocol)

	if (!code || !state) {
		console.log('❌ Missing code or state')
		return NextResponse.redirect(new URL('/dashboard?error=discord_auth_failed', req.url))
	}

	// Get fresh session
	const session = await auth()
	console.log('Session check:', {
		hasSession: !!session,
		hasUser: !!session?.user,
		hasJWT: !!session?.user?.jwt,
	})

	if (!session?.user?.jwt) {
		console.log('❌ No session or JWT found')
		return NextResponse.redirect(new URL('/dashboard?error=session_expired', req.url))
	}

	const freshJWT = session.user.jwt

	try {
		// Exchange code for Discord access token
		console.log('🔄 Exchanging code for Discord access token...')

		const redirectUri = `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/discord/callback`

		console.log('Token exchange params:', {
			client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
			redirect_uri: redirectUri,
			hasClientSecret: !!process.env.DISCORD_CLIENT_SECRET,
			clientSecretLength: process.env.DISCORD_CLIENT_SECRET?.length || 0,
		})

		const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
				client_secret: process.env.DISCORD_CLIENT_SECRET!,
				grant_type: 'authorization_code',
				code,
				redirect_uri: redirectUri,
			}),
		})

		console.log('Token response status:', {
			ok: tokenResponse.ok,
			status: tokenResponse.status,
			statusText: tokenResponse.statusText,
		})

		const tokenData = await tokenResponse.json()
		console.log('Token data:', {
			hasAccessToken: !!tokenData.access_token,
			hasError: !!tokenData.error,
			error: tokenData.error,
			tokenType: tokenData.token_type,
			scope: tokenData.scope,
			accessTokenLength: tokenData.access_token?.length || 0,
		})

		if (tokenData.error) {
			console.log('❌ Discord token exchange failed:', tokenData)
			return NextResponse.redirect(new URL('/dashboard?error=discord_token_failed', req.url))
		}

		// Get Discord user info
		console.log('🔄 Getting Discord user info...')
		const userResponse = await fetch('https://discord.com/api/users/@me', {
			headers: { Authorization: `Bearer ${tokenData.access_token}` },
		})

		console.log('Discord user response:', {
			ok: userResponse.ok,
			status: userResponse.status,
			statusText: userResponse.statusText,
		})

		const discordUser = await userResponse.json()
		console.log('Discord user data:', {
			hasId: !!discordUser.id,
			hasUsername: !!discordUser.username,
			hasError: !!discordUser.error,
			id: discordUser.id,
			username: discordUser.username,
			error: discordUser.error,
			message: discordUser.message,
		})

		if (discordUser.error || discordUser.message) {
			console.log('❌ Discord user API error:', discordUser)
			return NextResponse.redirect(new URL('/dashboard?error=discord_user_failed', req.url))
		}

		console.log('🔄 Updating Strapi user...')
		console.log('Strapi endpoint:', `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`)
		console.log('JWT length:', freshJWT?.length || 0)

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
			console.log('✅ Strapi update successful')

			// Get user data to check for existing donation
			console.log('🔄 Getting user data for role assignment...')
			const userDataResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
				headers: { Authorization: `Bearer ${freshJWT}` },
			})

			console.log('User data response:', {
				ok: userDataResponse.ok,
				status: userDataResponse.status,
			})

			const userData = await userDataResponse.json()

			console.log('User data for role assignment:', {
				hasDiscordId: !!userData.discordId,
				hasDonationTier: !!userData.donationTier,
				donationStatus: userData.donationStatus,
				donationTier: userData.donationTier,
				discordUserFromAPI: discordUser.id,
			})

			// If user has an active donation, assign Discord role
			if (userData.donationTier && userData.donationStatus === 'active') {
				console.log('🔄 Assigning Discord role...')
				try {
					console.log('Role assignment URL:', `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/discord/assign-role`)
					console.log('Role assignment payload:', {
						discordId: discordUser.id,
						donationTier: userData.donationTier,
					})

					const roleAssignResponse = await fetch(`${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api/discord/assign-role`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							discordId: discordUser.id,
							donationTier: userData.donationTier,
						}),
					})

					console.log('Role assignment response:', {
						ok: roleAssignResponse.ok,
						status: roleAssignResponse.status,
					})

					if (roleAssignResponse.ok) {
						console.log('✅ Discord role assigned for existing donation')
					} else {
						const errorText = await roleAssignResponse.text()
						console.log('❌ Failed to assign Discord role:', errorText)
					}
				} catch (error) {
					console.log('❌ Failed to assign Discord role (exception):', error)
				}
			} else {
				console.log('ℹ️ No role assignment needed - no active donation or missing tier')
			}

			console.log('✅ Redirecting to dashboard with success')
			return NextResponse.redirect(new URL('/dashboard?discord_connected=true', req.url))
		} else {
			const errorText = await updateResponse.text()
			console.log('❌ Strapi update failed:', {
				status: updateResponse.status,
				statusText: updateResponse.statusText,
				body: errorText,
			})
			return NextResponse.redirect(new URL('/dashboard?error=discord_update_failed', req.url))
		}
	} catch (error) {
		console.log('❌ Discord connection error (exception):', error)
		return NextResponse.redirect(new URL('/dashboard?error=discord_connection_failed', req.url))
	} finally {
		console.log('=== DISCORD CALLBACK DEBUG END ===')
	}
}
