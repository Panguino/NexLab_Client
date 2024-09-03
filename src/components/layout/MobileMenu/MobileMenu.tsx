'use client'
import { useRootStore } from '@/store/useRootStore'
import { circOut, motion } from 'framer-motion'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({ children, navItems }) => {
	const mobileMenuIsOpen = useRootStore.use.mobileMenuIsOpen()

	// const [activeMenu, setActiveMenu] = useState([{ items, name: 'main' }]) // Stack of menus

	// const goDeeper = (subItems, name) => {
	// 	setActiveMenu([...activeMenu, { items: subItems, name }])
	// }

	// const goBack = () => {
	// 	setActiveMenu(activeMenu.slice(0, activeMenu.length - 1))
	// }
	console.log('menuItems', navItems)

	return (
		<motion.div
			className={styles.MobileMenu}
			initial={{ x: '100%' }}
			animate={{ x: mobileMenuIsOpen ? 0 : '100%' }}
			transition={{ duration: mobileMenuIsOpen ? 0.4 : 0.25, ease: circOut }}
		>
			{children}
			{navItems.map((item) => (
				<div key={item.id}>
					{item.attributes.title} - {item.attributes.url}
				</div>
			))}
		</motion.div>
	)
}

export default MobileMenu
