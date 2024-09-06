'use client'
import { useRootStore } from '@/store/useRootStore'
import { AnimatePresence, circOut, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ScrollArea from '../ScrollArea/ScrollArea'
import styles from './MobileMenu.module.scss'
import MobileMenuItem from './MobileMenuItem/MobileMenuItem'

const variants = {
	initial: (direction) => ({
		x: direction > 0 ? '100%' : '-100%',
	}),
	animate: {
		x: 0,
		transition: { type: 'tween', duration: 0.35, ease: circOut },
	},
	exit: (direction) => ({
		x: direction < 0 ? '100%' : '-100%',
		transition: { type: 'tween', duration: 0.35, ease: circOut },
	}),
}

const MobileMenu = ({ children, navItems }) => {
	const mobileMenuIsOpen = useRootStore.use.mobileMenuIsOpen()
	const closeMobileMenu = useRootStore.use.closeMobileMenu()
	const [direction, setDirection] = useState(1)
	const [menuId, setMenuId] = useState(null)
	const pathname = usePathname()

	useEffect(() => {
		closeMobileMenu()
	}, [pathname, closeMobileMenu])

	const ifMenuItemHasChildren = (menuItemId) => {
		return navItems.some((navItem) => navItem.parentId === menuItemId)
	}
	const getParentIdByChildMenuId = (childMenuId) => {
		return navItems.find((navItem) => navItem.id === childMenuId).parentId || null
	}

	console.log('navItems', navItems)
	console.log('menuId', menuId)
	return (
		<motion.div
			className={styles.MobileMenu}
			initial={{ x: '100%' }}
			animate={{ x: mobileMenuIsOpen ? 0 : '100%' }}
			transition={{ duration: mobileMenuIsOpen ? 0.4 : 0.25, ease: circOut }}
		>
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={menuId}
					className={styles.container}
					custom={direction}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<ScrollArea>
						{children}
						{menuId !== null && ifMenuItemHasChildren(menuId) && (
							<MobileMenuItem
								title="Back"
								url={null}
								leftArrow={true}
								onArrowClick={() => {
									setDirection(-1)
									setMenuId(getParentIdByChildMenuId(menuId))
								}}
							/>
						)}
						{navItems
							.filter(({ parentId }) => parentId === menuId)
							.map(({ title, url, target, id }) => {
								return (
									<MobileMenuItem
										key={id}
										title={title}
										url={url}
										target={target}
										onArrowClick={
											ifMenuItemHasChildren(id)
												? () => {
														setDirection(1)
														setMenuId(id)
													}
												: null
										}
									/>
								)
							})}
					</ScrollArea>
				</motion.div>
			</AnimatePresence>
		</motion.div>
	)
}

export default MobileMenu
