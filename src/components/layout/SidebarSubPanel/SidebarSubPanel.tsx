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
	includesPath?: string
	matchesPath?: string
	children: React.ReactNode
	activeX: string | number
	inactiveX: string | number
}

const SidebarSubPanel = ({ includesPath, matchesPath, children, activeX, inactiveX }: SidebarSubPanelProps) => {
	const pathname = usePathname()
	return (
		<motion.div
			className={styles.SidebarSubPanel}
			animate={{ x: pathname.includes(includesPath) || pathname === matchesPath ? activeX : inactiveX }}
			initial={{ x: pathname.includes(includesPath) || pathname === matchesPath ? activeX : inactiveX }}
			transition={{ ...defaultTransition }}
		>
			{children}
		</motion.div>
	)
}

export default SidebarSubPanel
