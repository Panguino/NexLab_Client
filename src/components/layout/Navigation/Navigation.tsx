import Link from 'next/link'
import * as S from './Navigation.styles'

const Navigation = () => {
	return (
		<S.Navigation>
			<Link href="/">
				<S.Logo>
					<img src="/img/logo-cloud-filled.svg" />
					<img src="/img/logo-text.svg" />
				</S.Logo>
			</Link>
			<S.NavItems>
				<Link href="/data/">
					<S.NavItem>Weather Data</S.NavItem>
				</Link>
				<Link href="/academics/">
					<S.NavItem>Academics</S.NavItem>
				</Link>
				<Link href="/chasing/">
					<S.NavItem>Storm Chasing</S.NavItem>
				</Link>
				<Link href="/localwx/">
					<S.NavItem>Local Weather</S.NavItem>
				</Link>
				<Link href="/faqs/">
					<S.NavItem>FAQs</S.NavItem>
				</Link>
			</S.NavItems>
			<S.NavItems>
				<Link href="/login/">
					<S.NavItemButton>Login</S.NavItemButton>
				</Link>
				<Link href="/signup/">
					<S.NavItemButton>Signup</S.NavItemButton>
				</Link>
			</S.NavItems>
		</S.Navigation>
	)
}

export default Navigation
