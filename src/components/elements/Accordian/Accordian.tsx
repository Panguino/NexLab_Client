'use client'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './Accordian.module.scss'

interface AccordianProps {
	title: string
	children: React.ReactNode
	initiallyClosed?: boolean
	variant?: 'default' | 'line' | 'sidebar'
	isOpen?: boolean // New prop for external control
	onToggle?: (open: boolean) => void // Callback for state changes
}

export const Accordian = ({ title, children, initiallyClosed = false, variant = 'default', isOpen, onToggle }: AccordianProps) => {
	const [open, setOpen] = useState(isOpen ?? !initiallyClosed)

	// Sync internal state with external `isOpen` prop
	useEffect(() => {
		if (isOpen !== undefined) {
			setOpen(isOpen)
		}
	}, [isOpen])

	const handleToggle = () => {
		const newOpenState = !open
		if (isOpen === undefined) {
			setOpen(newOpenState) // Update internal state if `isOpen` is not provided
		}
		if (onToggle) {
			onToggle(newOpenState) // Notify parent component
		}
	}
	return (
		<div className={`${styles.accordian} ${styles[`variant-${variant}`]}`}>
			<div className={styles.title} onClick={handleToggle}>
				<span>{title}</span>
				<motion.div animate={{ transform: `${open ? 'rotate(0deg)' : 'rotate(180deg)'}` }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</motion.div>
			</div>
			<motion.div animate={{ height: open ? 'auto' : 0 }} className={styles.content}>
				{children}
			</motion.div>
		</div>
	)
}
