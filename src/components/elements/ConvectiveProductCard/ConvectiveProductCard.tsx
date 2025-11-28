'use client'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './ConvectiveProductCard.module.scss'

interface ConvectiveProductCardProps {
	icon: IconDefinition
	title: string
	description: string
	stat: string | null
	isLoading?: boolean
	linkUrl: string
}

export const ConvectiveProductCard = ({ icon, title, description, stat, isLoading = false, linkUrl }: ConvectiveProductCardProps) => {
	const router = useRouter()

	const handleClick = () => {
		router.push(linkUrl)
	}

	return (
		<div className={styles.convectiveProductCard} onClick={handleClick}>
			<div className={styles.cardIcon}>
				<FontAwesomeIcon icon={icon} />
			</div>
			<div className={styles.cardBody}>
				<div className={styles.cardTitle}>{title}</div>
				<div className={styles.cardContent}>
					<p className={styles.cardDescription}>{description}</p>
					<div className={styles.cardStat}>
						{isLoading ? <span className={styles.loading}>Loading...</span> : <span className={styles.count}>{stat}</span>}
					</div>
					<div className={styles.cardArrow}>→</div>
				</div>
			</div>
		</div>
	)
}
