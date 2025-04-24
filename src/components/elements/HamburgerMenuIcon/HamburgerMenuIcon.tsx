'use client'
import { useRootStore } from '@/store/useRootStore'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './HamburgerMenuIcon.module.scss'

const HamburgerMenuIcon = () => {
	const mobileMenuIsOpen = useRootStore.use.mobileMenuIsOpen()
	const openMobileMenu = useRootStore.use.openMobileMenu()
	const closeMobileMenu = useRootStore.use.closeMobileMenu()

	const toggleMenu = () => {
		if (mobileMenuIsOpen) {
			closeMobileMenu()
		} else {
			openMobileMenu()
		}
	}
	return (
		<div className={styles.HamburgerMenuIcon} onClick={toggleMenu}>
			{mobileMenuIsOpen ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faBars} />}
		</div>
	)
}

export default HamburgerMenuIcon
