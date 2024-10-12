'use client'

import Link from 'next/link'

import styles from './LinkAccordianItem.module.scss'

export const LinkAccordianItem = ({ name, link, file }) => {
	return (
		<div className={styles.LinkAccordianItem}>
			<Link href={file ? file : link} target="_blank">
				<span>{name}</span>
				<span>View</span>
			</Link>
		</div>
	)
}
