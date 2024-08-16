import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions, getServerSession } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

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
		async session({ session, token }) {
			session.user = token as any
			//console.log('session', user, session, token)
			return Promise.resolve(session)
		},

		async jwt({ token, user, account }) {
			const isSignIn = user ? true : false
			if (isSignIn && account) {
				try {
					//console.log('Google Account >>>>>>>>>>>>>> ', account)
					const public_url = process.env.NEXT_PUBLIC_API_URL
					const response = await fetch(`${public_url}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`)
					const data = await response.json()
					//console.log('Strapi Callback Data >>>>>>>>>>>>>> ', data)
					token.jwt = data.jwt
					token.id = data.user.id
				} catch (error) {
					console.error('Fetch failed:', error)
				}
			}
			return Promise.resolve({ ...token, ...user })
		},
	},
	secret: process.env.NEXTAUTH_SECRET as string,
}

function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
	// <-- use this function to access the jwt from React components
	return getServerSession(...args, authConfig) as any
}

export { auth, authConfig }
