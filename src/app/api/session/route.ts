import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {
	const token = await getToken({ req, secret, cookieName: 'next-auth.session-token' })
	console.log('token', token)
	return NextResponse.json({ token })
}
