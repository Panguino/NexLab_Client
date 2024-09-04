'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ApolloStrapiProvider } from '../ApolloStrapiProvider/ApolloStrapiProvider'

interface ProviderProps {
	children: ReactNode
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
	return (
		<ApolloStrapiProvider>
			<ThemeProvider attribute="class" defaultTheme="dark" storageKey="nl-theme-pref" enableSystem>
				{children}
			</ThemeProvider>
		</ApolloStrapiProvider>
	)
}

export default Providers
