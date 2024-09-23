'use client'
import AuthMenuStatusInfo from '@/components/elements/AuthMenuStatusInfo/AuthMenuStatusInfo'
import DarkmodeToggler from '@/components/elements/DarkmodeToggler/DarkmodeToggler'
import HamburgerMenuIcon from '@/components/elements/HamburgerMenuIcon/HamburgerMenuIcon'
import SearchIcon from '@/components/elements/SearchIcon/SearchIcon'
import { useRootStore } from '@/store/useRootStore'
import Link from 'next/link'
import MobileMenu from '../MobileMenu/MobileMenu'
import styles from './Navigation.module.scss'

const Navigation = ({ mobileMenuItems }) => {
	const hazardMapFullScreen = useRootStore.use.hazardMapFullScreen()
	const hideNavigation = hazardMapFullScreen

	return (
		<>
			<div className={`Navigation ${styles.Navigation} ${hideNavigation ? styles.hide : ''}`}>
				<Link href="/">
					<div className={styles.Logo}>
						<img src="/img/logo-cloud-filled.svg" />
						<img src="/img/logo-text.svg" />
					</div>
				</Link>
				<div className={styles.NavItems}>
					<Link href="/weather-data/">
						<div className={styles.NavItem}>Weather Data</div>
					</Link>
					<Link href="/academics/">
						<div className={styles.NavItem}>Academics</div>
					</Link>
					<Link href="/academics/storm-chasing/">
						<div className={styles.NavItem}>Storm Chasing</div>
					</Link>
					<Link href="/campus-weather/">
						<div className={styles.NavItem}>Local Weather</div>
					</Link>
					<Link href="/faqs/">
						<div className={styles.NavItem}>FAQs</div>
					</Link>
				</div>
				<div className={styles.NavItems}>
					<SearchIcon />
					<DarkmodeToggler />
					<AuthMenuStatusInfo />
				</div>
				<HamburgerMenuIcon />
			</div>
			<div className={`NavigationSpacer ${styles.Spacer} ${hideNavigation ? styles.hide : ''}`} />
			<MobileMenu navItems={mobileMenuItems}>
				<div className={`NavigationSpacer ${styles.Spacer}`} />
			</MobileMenu>
		</>
	)
}

export default Navigation
