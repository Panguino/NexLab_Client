import { getMobileMenu } from '@/apollo/strapi/getMobileMenu'
import Navigation from '@/components/layout/Navigation/Navigation'
import SlideoutPanel from '@/components/layout/SlideoutPanel/SlideoutPanel'
import Providers from '@/components/providers/Providers/Providers'
import { NextAuthProvider } from '@/components/providers/SessionProvider/SessionProvider'
import '@/styles/global.scss'
import { Viewport } from 'next'

export default async function RootLayout({ children }) {
	const mobileMenuItems = await getMobileMenu()
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@200;400;600;700;900&display=swap"
					rel="stylesheet"
				/>
				<link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/img/favicon/site.webmanifest" />
				<link rel="mask-icon" href="/img/favicon/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#2b5797" />
				<meta name="theme-color" content="#ffffff"></meta>
				<meta name="referrer" content="strict-origin-when-cross-origin" />
				<title>NexLab</title>
			</head>
			<body>
				<div className="all">
					<NextAuthProvider>
						<Providers>
							<SlideoutPanel />
							<Navigation mobileMenuItems={mobileMenuItems} />
							{children}
						</Providers>
					</NextAuthProvider>
				</div>
			</body>
		</html>
	)
}
export const dynamic = 'force-dynamic'
export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	maximumScale: 1,
	userScalable: false,
}
