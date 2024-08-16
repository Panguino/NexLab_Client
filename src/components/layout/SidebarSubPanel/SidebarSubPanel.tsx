'use client'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import styles from './SidebarSubPanel.module.scss'

const defaultTransition = {
	default: {
		duration: 0.4,
		ease: 'easeInOut',
	},
}

interface SidebarSubPanelProps {
	path: string
	children: React.ReactNode
	activeX: number
	inactiveX: number
}

const SidebarSubPanel = ({ path, children, activeX, inactiveX }: SidebarSubPanelProps) => {
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
