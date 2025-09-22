import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// Storybook-safe Apollo clients (no server-only imports)
// These are lightweight clients that won't be used to hit real backends during stories,
// but they satisfy modules that import getClient/getDataClient at build time.

export const getClient = () =>
	new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({ uri: 'https://example.com/graphql', fetchOptions: { cache: 'no-store' } }),
	})

export const getDataClient = () =>
	new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({ uri: 'https://example.com/graphql', fetchOptions: { cache: 'no-store' } }),
	})

