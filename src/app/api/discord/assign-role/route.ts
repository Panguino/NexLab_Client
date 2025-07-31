import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		console.log('Discord assign-role request body:', body)

		const { discordId, donationTier } = body

		console.log('Parsed values:', { discordId, donationTier })

		if (!discordId || !donationTier) {
			console.error('Missing required fields:', { discordId: !!discordId, donationTier: !!donationTier })
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
		}

		// Map donation tiers to Discord role IDs
		const roleMapping = {
			standard: process.env.DISCORD_STANDARD_ROLE_ID,
			advanced: process.env.DISCORD_ADVANCED_ROLE_ID,
			premium: process.env.DISCORD_PREMIUM_ROLE_ID,
			sponsor: process.env.DISCORD_SPONSOR_ROLE_ID,
		}

		console.log('Role mapping:', roleMapping)
		console.log('Looking for tier:', donationTier.toLowerCase())

		const roleId = roleMapping[donationTier.toLowerCase()]
		console.log('Found role ID:', roleId)

		if (!roleId) {
			console.error('Invalid donation tier:', donationTier)
			console.error('Available tiers:', Object.keys(roleMapping))
			return NextResponse.json({ error: 'Invalid donation tier' }, { status: 400 })
		}

		console.log('Environment variables check:', {
			hasGuildId: !!process.env.DISCORD_GUILD_ID,
			hasBotToken: !!process.env.DISCORD_BOT_TOKEN,
			guildId: process.env.DISCORD_GUILD_ID,
		})

		// Add role to Discord user
		const discordUrl = `https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordId}/roles/${roleId}`
		console.log('Discord API URL:', discordUrl)

		const response = await fetch(discordUrl, {
			method: 'PUT',
			headers: {
				Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
				'Content-Type': 'application/json',
			},
		})

		console.log('Discord API response:', { ok: response.ok, status: response.status })

		if (response.ok) {
			console.log(`Successfully assigned ${donationTier} role to Discord user ${discordId}`)
			return NextResponse.json({ success: true })
		} else {
			const error = await response.text()
			console.error('Discord API error:', error)
			return NextResponse.json({ error: 'Failed to assign role', details: error }, { status: 500 })
		}
	} catch (error) {
		console.error('Error in assign-role endpoint:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
