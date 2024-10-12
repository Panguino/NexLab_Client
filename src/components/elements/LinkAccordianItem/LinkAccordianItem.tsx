'use client'

import Link from 'next/link'

import styles from './LinkAccordianItem.module.scss'

interface ILinkAccordianItem {
	name: string
	link: string
	file?: string | null
}

export const LinkAccordianItem = ({ name, link, file = null }: ILinkAccordianItem) => {
	return (
		<div className={styles.LinkAccordianItem}>
			<Link href={file ? file : link} target="_blank">
				<span>{name}</span>
				<span>View</span>
			</Link>
		</div>
	)
}
