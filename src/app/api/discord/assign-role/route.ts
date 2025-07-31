import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { discordId, donationTier } = await req.json()

		if (!discordId || !donationTier) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
		}

		// Map donation tiers to Discord role IDs
		const roleMapping = {
			standard: process.env.DISCORD_STANDARD_ROLE_ID,
			advanced: process.env.DISCORD_ADVANCED_ROLE_ID,
			premium: process.env.DISCORD_PREMIUM_ROLE_ID,
			sponsor: process.env.DISCORD_SPONSOR_ROLE_ID,
		}

		const roleId = roleMapping[donationTier.toLowerCase()]
		if (!roleId) {
			return NextResponse.json({ error: 'Invalid donation tier' }, { status: 400 })
		}

		// Add role to Discord user
		const response = await fetch(`https://discord.com/api/v10/guilds/${process.env.DISCORD_GUILD_ID}/members/${discordId}/roles/${roleId}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			console.log(`Successfully assigned ${donationTier} role to Discord user ${discordId}`)
			return NextResponse.json({ success: true })
		} else {
			const error = await response.text()
			console.error('Discord API error:', error)
			console.error('Attempted to assign role:', roleId, 'to user:', discordId)
			return NextResponse.json({ error: 'Failed to assign role', details: error }, { status: 500 })
		}
	} catch (error) {
		console.error('Error assigning Discord role:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
