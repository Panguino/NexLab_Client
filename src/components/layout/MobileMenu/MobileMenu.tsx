'use client'
import { useRootStore } from '@/store/useRootStore'
import { circOut, motion } from 'framer-motion'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({ children }) => {
	const mobileMenuIsOpen = useRootStore.use.mobileMenuIsOpen()
	const items = [
		{ name: 'menuItem1', subItems: [] },
		{ name: 'menuItem2', subItems: [] },
		{ name: 'menuItem3', subItems: [] },
	]
	// const [activeMenu, setActiveMenu] = useState([{ items, name: 'main' }]) // Stack of menus

	// const goDeeper = (subItems, name) => {
	// 	setActiveMenu([...activeMenu, { items: subItems, name }])
	// }

	// const goBack = () => {
	// 	setActiveMenu(activeMenu.slice(0, activeMenu.length - 1))
	// }

	return (
		<motion.div
			className={styles.MobileMenu}
			initial={{ x: '100%' }}
			animate={{ x: mobileMenuIsOpen ? 0 : '100%' }}
			transition={{ duration: mobileMenuIsOpen ? 0.4 : 0.25, ease: circOut }}
		>
			{children}
			{items.map((item) => (
				<div key={item.name}>{item.name}</div>
			))}
		</motion.div>
	)
}

export default MobileMenu
