import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	return NextResponse.json({
		environment: process.env.NODE_ENV,
		hasDiscordClientId: !!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
		hasDiscordClientSecret: !!process.env.DISCORD_CLIENT_SECRET,
		hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
		nextAuthUrl: process.env.NEXTAUTH_URL,
		discordClientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
		domain: req.nextUrl.host,
	})
}
