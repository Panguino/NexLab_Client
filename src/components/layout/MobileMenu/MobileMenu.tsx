'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({ items }) => {
	const [activeMenu, setActiveMenu] = useState([{ items, name: 'main' }]) // Stack of menus

	const goDeeper = (subItems, name) => {
		setActiveMenu([...activeMenu, { items: subItems, name }])
	}

	const goBack = () => {
		setActiveMenu(activeMenu.slice(0, activeMenu.length - 1))
	}

	return (
		<motion.div className={styles.MobileMenu} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
			{activeMenu[activeMenu.length - 1].items.map((item) => (
				<div key={item.name}>
					{item.subItems ? <button onClick={() => goDeeper(item.subItems, item.name)}>{item.name}</button> : <span>{item.name}</span>}
				</div>
			))}
			{activeMenu.length > 1 && <button onClick={goBack}>Back</button>}
		</motion.div>
	)
}

export default MobileMenu
