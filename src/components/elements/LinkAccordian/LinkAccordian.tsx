'use client'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './LinkAccordian.module.scss'

export const LinkAccordian = ({ title, children }) => {
	const [open, setOpen] = useState(true)
	return (
		<div className={styles.LinkAccordian}>
			<div
				className={styles.title}
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
