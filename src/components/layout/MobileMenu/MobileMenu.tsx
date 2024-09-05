'use client'
import { useRootStore } from '@/store/useRootStore'
import { circOut, motion } from 'framer-motion'
import { useState } from 'react'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({ children, navItems }) => {
	const mobileMenuIsOpen = useRootStore.use.mobileMenuIsOpen()

	const [menuId, setMenuId] = useState(null)
	// const [activeMenu, setActiveMenu] = useState([{ items, name: 'main' }]) // Stack of menus

	// const goDeeper = (subItems, name) => {
	// 	setActiveMenu([...activeMenu, { items: subItems, name }])
	// }

	// const goBack = () => {
	// 	setActiveMenu(activeMenu.slice(0, activeMenu.length - 1))
	// }
	//console.log('menuItems', navItems)

	const ifMenuItemHasChildren = (menuItemId) => {
		return navItems.some((navItem) => navItem.attributes.parent.data?.id === menuItemId)
	}
	const getParentIdByChildMenuId = (childMenuId) => {
		return navItems.find((navItem) => navItem.id === childMenuId).attributes.parent.data?.id || null
	}
	console.log('menuId', menuId)
	return (
		<motion.div
			className={styles.MobileMenu}
			initial={{ x: '100%' }}
			animate={{ x: mobileMenuIsOpen ? 0 : '100%' }}
			transition={{ duration: mobileMenuIsOpen ? 0.4 : 0.25, ease: circOut }}
		>
			{children}
			{menuId !== null && ifMenuItemHasChildren(menuId) && <div onClick={() => setMenuId(getParentIdByChildMenuId(menuId))}>-- Back</div>}
			{navItems
				.filter((item) => item.attributes.parent.data?.id === menuId || item.attributes.parent.data === menuId)
				.map((item) => {
					return (
						<div
							key={item.id}
							onClick={() => {
								if (ifMenuItemHasChildren(item.id)) {
									setMenuId(item.id)
								}
							}}
						>
							{item.attributes.title} - {item.attributes.url} ---- {ifMenuItemHasChildren(item.id) && 'has children'}
						</div>
					)
				})}
		</motion.div>
	)
}

export default MobileMenu
