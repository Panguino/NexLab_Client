'use client'
import { useRootStore } from '@/store/useRootStore'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './MobileIconNav.module.scss'

const MobileIconNav = () => {
	const toggleMobileSidebarMenu = useRootStore.use.toggleMobileSidebarMenu()
	const iconNavItems = [
		{
			icon: <FontAwesomeIcon icon={faSliders} />,
			onClick: () => {
				toggleMobileSidebarMenu()
			},
		},
	]
	return (
		<div className={styles.MobileIconNav}>
			{iconNavItems.map((item, index) => (
				<div key={index} className={styles.icon} onClick={item.onClick}>
					{item.icon}
				</div>
			))}
		</div>
	)
}

export default MobileIconNav
