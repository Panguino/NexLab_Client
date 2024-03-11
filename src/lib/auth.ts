import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { NextAuthOptions } from 'next-auth'

export const authConfig: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string
		})
	],
	session: { strategy: 'jwt' },
	callbacks: {
		async session({ user, session, token }) {
			session.user = token as any
			console.log('session', user, session, token)
			return Promise.resolve(session)
		},

		async jwt({ token, user, account }) {
			const isSignIn = user ? true : false
			if (isSignIn && account) {
				try {
					console.log('Google Account >>>>>>>>>>>>>> ', account)
					const public_url = process.env.NEXT_PUBLIC_API_URL
					const response = await fetch(`${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`)
					const data = await response.json()
					console.log('Strapi Callback Data >>>>>>>>>>>>>> ', data)
					token.jwt = data.jwt
					token.id = data.user.id
				} catch (error) {
					console.error('Fetch failed:', error)
				}
			}
			return Promise.resolve(token)
		}
	},
	secret: process.env.NEXTAUTH_SECRET as string
}
