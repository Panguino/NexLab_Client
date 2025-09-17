import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions, getServerSession } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

const isSecureCookie = Boolean(process.env.NEXTAUTH_URL?.startsWith('https://') || process.env.VERCEL_URL)

const authConfig: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		}),
	],
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async redirect({ url, baseUrl }) {
			// If url is a relative path, prepend baseUrl
			if (url.startsWith('/')) return `${baseUrl}${url}`
			// If url is on the same origin, return it
			if (new URL(url).origin === baseUrl) return url
			// Otherwise return baseUrl
			return baseUrl
		},
		async session({ session, token }) {
			session.user = {
				...token,
				jwt: token.jwt,
				id: token.id,
			} as any
			return Promise.resolve(session)
		},
		async jwt({ token, user, account }) {
			const isSignIn = user ? true : false
			if (isSignIn && account) {
				try {
					const public_url = process.env.NEXT_PUBLIC_API_URL
					console.log('🔄 [AUTH] Starting backend auth callback:', {
						provider: account.provider,
						userEmail: user?.email,
						hasAccessToken: !!account?.access_token,
						url: `${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`,
					})

					const response = await fetch(`${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`)

					console.log('📡 [AUTH] Backend response:', {
						ok: response.ok,
						status: response.status,
						statusText: response.statusText,
						provider: account.provider,
					})

					const data = await response.json()
					console.log('📦 [AUTH] Backend data:', {
						hasJWT: !!data.jwt,
						hasUser: !!data.user,
						hasUserId: !!data.user?.id,
						userId: data.user?.id,
						userEmail: data.user?.email,
						provider: account.provider,
						isAccountLinking: data.accountLinked || false,
						error: data.error?.message,
					})

					if (data.jwt && data.user?.id) {
						token.jwt = data.jwt
						token.id = data.user.id
						console.log('✅ [AUTH] Successfully authenticated:', {
							provider: account.provider,
							userId: data.user.id,
							email: data.user.email,
						})
					} else {
						console.error('❌ [AUTH] Authentication failed:', {
							provider: account.provider,
							error: data.error?.message || 'Missing JWT or user ID',
							data,
						})
					}
				} catch (error) {
					console.error('💥 [AUTH] Backend auth fetch failed:', {
						provider: account.provider,
						error: error.message,
						stack: error.stack,
					})
				}
			}
			return Promise.resolve({ ...token, ...user })
		},
	},
	secret: process.env.NEXTAUTH_SECRET as string,
	cookies: {
		// Namespace cookie to avoid collisions across projects on same origin
		sessionToken: {
			name: 'nexlab-next-auth.session-token',
			options: {
				httpOnly: true,
				path: '/',
				sameSite: 'lax',
				secure: isSecureCookie,
			},
		},
	},
}

function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
	// <-- use this function to access the jwt from React components
	return getServerSession(...args, authConfig) as any
}

export { auth, authConfig }
