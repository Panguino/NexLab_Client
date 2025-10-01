'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'

const makeClient = () => {
	const httpLink = new HttpLink({
		uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
		fetchOptions: { cache: 'no-store' },
	})

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
					])
				: httpLink,
	})
}

export const ApolloStrapiProvider = ({ children }) => {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
