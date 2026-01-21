'use client'

import { faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styles from './PageLinkCard.module.scss'

export interface PageLinkCardProps {
	id: string
	name: string
	description: string
	icon: IconDefinition
	linkUrl: string
}

export const PageLinkCard = ({ id, name, description, icon, linkUrl }: PageLinkCardProps) => {
	return (
		<Link href={linkUrl} key={id} className={styles.card}>
			<div className={styles.cardHeader}>
				<div className={styles.iconWrapper}>
					<FontAwesomeIcon icon={icon} />
				</div>
				<span className={styles.exploreLink}>
					Explore
					<FontAwesomeIcon icon={faArrowRight} />
				</span>
			</div>
			<h2 className={styles.cardTitle}>{name}</h2>
			<p className={styles.cardDescription}>{description}</p>
		</Link>
	)
}

export default PageLinkCard
