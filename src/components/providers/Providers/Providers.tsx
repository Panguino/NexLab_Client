'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ProviderProps {
	children: ReactNode
}

const Providers: React.FC<ProviderProps> = ({ children }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" storageKey="nl-theme-pref" enableSystem>
			{children}
		</ThemeProvider>
	)
}

export default Providers
