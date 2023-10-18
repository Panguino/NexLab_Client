'use client'
import { Normalize } from 'styled-normalize'
import { GlobalStyles } from '@/styles/GlobalStyles'
import Navigation from '@/components/layout/Navigation/Navigation'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<Normalize />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Montserrat:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<title>NexLab</title>
			</head>
			<body>
				<GlobalStyles />
				<Navigation />
				{children}
			</body>
		</html>
	)
}
