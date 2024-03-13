import Navigation from '@/components/layout/Navigation/Navigation'
import '@/styles/global.scss'
import Providers from '@/components/providers/Providers/Providers'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@200;400;600;700;900&display=swap"
					rel="stylesheet"
				/>
				<meta name="referrer" content="strict-origin-when-cross-origin" />
				<title>NexLab</title>
			</head>
			<body>
				<div className="all">
					<Providers>
						<Navigation />
						{children}
					</Providers>
				</div>
			</body>
		</html>
	)
}
