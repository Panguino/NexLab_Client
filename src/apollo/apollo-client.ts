import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

// Provide fallback URLs for Storybook/Chromatic builds
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api-nexlab-production-e1f10bd85572.herokuapp.com'
const dataApiUrl = process.env.NEXT_PUBLIC_DATA_API_URL || 'https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com'

// Only validate env vars if they're explicitly set (not using fallbacks)
if (process.env.NEXT_PUBLIC_API_URL) {
	if (process.env.NEXT_PUBLIC_API_URL?.endsWith('/')) {
		throw new Error('NEXT_PUBLIC_API_URL has a trailing slash')
	}
}
if (process.env.NEXT_PUBLIC_DATA_API_URL) {
	if (process.env.NEXT_PUBLIC_DATA_API_URL?.endsWith('/')) {
		throw new Error('NEXT_PUBLIC_DATA_API_URL has a trailing slash')
	}
}

export const { getClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: apiUrl + '/graphql',
			fetchOptions: { cache: 'no-store' },
		}),
	})
})

export const { getClient: getDataClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: dataApiUrl + '/graphql',
			fetchOptions: { cache: 'no-store' },
		}),
	})
})
