import { NextRequest, NextResponse } from 'next/server'

export async function POST(_req: NextRequest) {
	const response = NextResponse.json({ message: 'Cookies cleared' })

	// Clear all NextAuth cookies
	response.cookies.delete('nexlab-next-auth.session-token')
	response.cookies.delete('nexlab-next-auth.csrf-token')
	response.cookies.delete('nexlab-next-auth.callback-url')
	response.cookies.delete('nexlab-next-auth.pkce.code_verifier')

	// Also clear any standard NextAuth cookies that might exist
	response.cookies.delete('next-auth.session-token')
	response.cookies.delete('next-auth.csrf-token')
	response.cookies.delete('next-auth.callback-url')
	response.cookies.delete('next-auth.pkce.code_verifier')

	return response
}
