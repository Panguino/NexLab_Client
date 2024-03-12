import Navigation from '@/components/layout/Navigation/Navigation'
import '@/styles/global.scss'

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Inter:wght@200;400;600;700;900&display=swap"
					rel="stylesheet"
				/>
				<meta name="referrer" content="strict-origin-when-cross-origin" />
				<title>NexLab</title>
			</head>
			<body>
				<div className="all">
					<Navigation />
					{children}
				</div>
			</body>
		</html>
	)
}
