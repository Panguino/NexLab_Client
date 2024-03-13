'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

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
