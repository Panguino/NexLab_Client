import styles from './WatchSummaryCard.module.scss'

interface WatchAttributes {
	'MAX HAIL /INCHES/'?: string
	'MAX TOPS /X 100 FEET/'?: string
	'MAX WIND GUSTS SURFACE /KNOTS/'?: string
	'MEAN STORM MOTION VECTOR /DEGREES AND KNOTS/'?: string
	'PARTICULARLY DANGEROUS SITUATION'?: string
}

interface WatchProbabilities {
	'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES'?: string
	'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES'?: string
	'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS'?: string
	'PROB OF 10 OR MORE SEVERE HAIL EVENTS'?: string
	'PROB OF 10 OR MORE SEVERE WIND EVENTS'?: string
	'PROB OF 2 OR MORE TORNADOES'?: string
	'PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS'?: string
}

interface WatchSummaryCardProps {
	number: string
	watchType: string
	notActive: boolean
	timeBegin: string
	timeEnd: string
	states: string[]
	attributes: WatchAttributes
	probabilities: WatchProbabilities
	graphic: string
}

export const WatchSummaryCard = ({
	number,
	watchType,
	notActive,
	timeBegin,
	timeEnd,
	states,
	attributes,
	probabilities,
	graphic,
}: WatchSummaryCardProps) => {
	// Determine color coding based on watch type
	const getTypeClass = () => {
		if (notActive) return styles.expired
		if (watchType === 'Tornado') return styles.tornado
		if (watchType === 'Severe Thunderstorm') return styles.severeThunderstorm
		return styles.default
	}

	// Decode attributes
	const decodeAttributes = () => {
		const decoded: Record<string, string> = {}

		if (attributes['MAX HAIL /INCHES/']) {
			decoded['Max Hail'] = `${attributes['MAX HAIL /INCHES/']} in.`
		}

		if (attributes['MAX TOPS /X 100 FEET/']) {
			const value = parseInt(attributes['MAX TOPS /X 100 FEET/']) * 100
			decoded['Max Tops'] = `${value.toLocaleString()} ft`
		}

		if (attributes['MAX WIND GUSTS SURFACE /KNOTS/']) {
			decoded['Max Wind Gusts'] = `${attributes['MAX WIND GUSTS SURFACE /KNOTS/']} kts`
		}

		if (attributes['MEAN STORM MOTION VECTOR /DEGREES AND KNOTS/']) {
			const vector = attributes['MEAN STORM MOTION VECTOR /DEGREES AND KNOTS/']
			const direction = vector.slice(0, 3)
			const speed = vector.slice(3)
			decoded['Storm Motion'] = `${direction}° @ ${speed} kts`
		}

		if (attributes['PARTICULARLY DANGEROUS SITUATION']) {
			decoded['PDS'] = attributes['PARTICULARLY DANGEROUS SITUATION']
		}

		return decoded
	}

	// Format probability labels
	const formatProbabilityLabel = (key: string): string | null => {
		if (key === 'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES') return 'Hail >= 2"'
		if (key === 'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES') return 'EF2+ Tornadoes'
		if (key === 'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS') return 'Wind +65 kts'
		if (key === 'PROB OF 10 OR MORE SEVERE HAIL EVENTS') return 'Hail'
		if (key === 'PROB OF 10 OR MORE SEVERE WIND EVENTS') return 'Wind'
		if (key === 'PROB OF 2 OR MORE TORNADOES') return 'Tornadoes'
		if (key === 'PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS') return null // Omit combined
		return key
	}

	// Get probability value class based on percentage
	const getProbabilityClass = (value: string): string => {
		const percentage = parseInt(value.replace('%', ''))
		if (percentage >= 30) return styles.highProb
		return styles.moderateProb
	}

	const decodedAttributes = decodeAttributes()

	return (
		<div className={styles.watchSummaryCard}>
			<div className={`${styles.header} ${getTypeClass()}`}>
				<div className={styles.titleRow}>
					{watchType} Watch #{number}
					{notActive && <span className={styles.expiredBadge}>Expired</span>}
				</div>
			</div>

			<div className={styles.content}>
				<div className={styles.mainContent}>
					<div className={styles.graphicSection}>
						<img src={graphic} alt={`Watch ${number}`} className={styles.graphic} />
					</div>

					<div className={styles.detailsSection}>
						<div className={styles.detailItem}>
							<span className={styles.label}>Valid Time:</span>
							<span className={styles.value}>
								{timeBegin} - {timeEnd}
							</span>
						</div>

						{states.length > 0 && (
							<div className={styles.detailItem}>
								<span className={styles.label}>States:</span>
								<span className={styles.value}>{states.join(', ')}</span>
							</div>
						)}

						<div className={styles.attributesGrid}>
							{Object.entries(decodedAttributes).map(([key, value]) => (
								<div key={key} className={styles.attributeItem}>
									<span className={styles.attrLabel}>{key}:</span>
									<span className={styles.attrValue}>{value}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{Object.keys(probabilities).length > 0 && (
					<div className={styles.probabilitiesSection}>
						<div className={styles.sectionTitle}>Probabilities</div>
						<div className={styles.probsList}>
							{[
								'PROB OF 2 OR MORE TORNADOES',
								'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES',
								'PROB OF 10 OR MORE SEVERE HAIL EVENTS',
								'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES',
								'PROB OF 10 OR MORE SEVERE WIND EVENTS',
								'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS',
							].map((key) => {
								const value = probabilities[key as keyof WatchProbabilities]
								if (!value) return null
								const label = formatProbabilityLabel(key)
								if (label === null) return null
								return (
									<div key={key} className={styles.probItem}>
										<span className={styles.probLabel}>{label}:</span>
										<span className={`${styles.probValue} ${!notActive ? getProbabilityClass(value) : ''}`}>{value}</span>
									</div>
								)
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
