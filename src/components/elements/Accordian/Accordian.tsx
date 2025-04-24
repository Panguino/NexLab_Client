'use client'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './Accordian.module.scss'

interface AccordianProps {
	title: string
	children: React.ReactNode
	initiallyClosed?: boolean
	variant?: 'default' | 'line'
}

export const Accordian = ({ title, children, initiallyClosed = false, variant = 'default' }: AccordianProps) => {
	const [open, setOpen] = useState(!initiallyClosed)
	return (
		<div className={styles.accordian}>
			<div
				className={`${styles.title} ${styles[`variant-${variant}`]}`}
				onClick={() => {
					setOpen(!open)
				}}
			>
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
