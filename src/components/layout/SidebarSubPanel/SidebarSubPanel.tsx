'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import styles from './SidebarSubPanel.module.scss'

const defaultTransition = {
	default: {
		duration: 0.4,
		ease: 'easeInOut'
	}
}

const SidebarSubPanel = ({ path, children, activeX, inactiveX }) => {
	const pathname = usePathname()
	return (
		<motion.div
			className={styles.SidebarSubPanel}
			animate={{ x: pathname === path ? activeX : inactiveX }}
			initial={{ x: pathname === path ? activeX : inactiveX }}
			transition={{ ...defaultTransition }}
		>
			{children}
		</motion.div>
	)
}

export default SidebarSubPanel
