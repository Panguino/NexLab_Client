import styles from './MDSummaryCard.module.scss'

interface MDSummaryCardProps {
	type: string
	number: string
	notActive: boolean
	timeBegin: string
	timeEnd: string
	areasAffected: string
	concerning: string
	watchProb: string
	graphic: string
}

export const MDSummaryCard = ({ type, number, notActive, timeBegin, timeEnd, areasAffected, concerning, watchProb, graphic }: MDSummaryCardProps) => {
	// Determine color coding based on type and active status
	const getTypeClass = () => {
		if (notActive) return styles.expired
		if (type === 'MCD') return styles.mcd
		if (type === 'MPD') return styles.mpd
		return styles.default
	}

	const getTypeLabel = () => {
		if (type === 'MCD') return 'Mesoscale Convective Discussion'
		if (type === 'MPD') return 'Mesoscale Precipitation Discussion'
		return type
	}

	return (
		<div className={styles.mdSummaryCard}>
			<div className={`${styles.header} ${getTypeClass()}`}>
				<div className={styles.titleRow}>
					{getTypeLabel()} #{number}
					{notActive && <span className={styles.expiredBadge}>Expired</span>}
				</div>
			</div>

			<div className={styles.content}>
				<div className={styles.graphicSection}>
					<img src={graphic} alt={`${type} ${number}`} className={styles.graphic} />
				</div>

				<div className={styles.detailsSection}>
					<div className={styles.detailItem}>
						<span className={styles.label}>Valid Time:</span>
						<span className={styles.value}>
							{timeBegin} - {timeEnd}
						</span>
					</div>

					<div className={styles.detailItem}>
						<span className={styles.label}>Areas Affected:</span>
						<span className={styles.value}>{areasAffected}</span>
					</div>

					<div className={styles.detailItem}>
						<span className={styles.label}>Concerning:</span>
						<span className={styles.value}>{concerning}</span>
					</div>

					<div className={styles.detailItem}>
						<span className={styles.label}>Watch Probability:</span>
						<span className={styles.value}>{watchProb || 'N/A'}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
