import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

if (!process.env.NEXT_PUBLIC_API_URL) {
	throw new Error('NEXT_PUBLIC_API_URL is not defined')
}
if (process.env.NEXT_PUBLIC_API_URL?.endsWith('/')) {
	throw new Error('NEXT_PUBLIC_API_URL has a trailing slash')
}
if (!process.env.NEXT_PUBLIC_DATA_API_URL) {
	throw new Error('NEXT_PUBLIC_DATA_API_URL is not defined')
}
if (process.env.NEXT_PUBLIC_DATA_API_URL?.endsWith('/')) {
	throw new Error('NEXT_PUBLIC_DATA_API_URL has a trailing slash')
}

export const { getClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_API_URL + '/graphql',
			fetchOptions: { cache: 'no-store' },
		}),
	})
})

export const { getClient: getDataClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_DATA_API_URL + '/graphql',
			fetchOptions: { cache: 'no-store' },
		}),
	})
})
