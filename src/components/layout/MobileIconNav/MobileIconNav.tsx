'use client'
import { useRootStore } from '@/store/useRootStore'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MobileIconNav.module.scss'

const MobileIconNav = ({ topRight = false, tab = false }) => {
	const toggleMobileSidebarMenu = useRootStore.use.toggleMobileSidebarMenu()
	const mobileSidebarMenuIsOpen = useRootStore.use.mobileSidebarMenuIsOpen()
	const iconNavItems = [
		{
			icon: <FontAwesomeIcon icon={faSliders} />,
			onClick: () => {
				toggleMobileSidebarMenu()
			},
		},
	]
	// Use CSS variable so sidebar width can be configured per-theme/layout
	const iconTranslate = mobileSidebarMenuIsOpen ? 'translateX(var(--sidebar-width))' : 'translateX(0)'
	return (
		<div className={`${styles.MobileIconNav} ${topRight ? styles.topRight : ''} ${tab ? styles.tab : ''}`} style={{ transform: iconTranslate }}>
			{iconNavItems.map((item, index) => (
				<div key={index} className={styles.icon} onClick={item.onClick}>
					{item.icon}
				</div>
			))}
		</div>
	)
}

export default MobileIconNav
