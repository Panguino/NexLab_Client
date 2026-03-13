'use client'

import {
	CONVECTIVE_WATCH_ATTRIBUTES,
	CONVECTIVE_WATCH_ATTRIBUTES_IDS,
	CONVECTIVE_WATCH_DISCUSSION,
	CONVECTIVE_WATCH_PROBABILITIES,
	CONVECTIVE_WATCH_PROBABILITIES_IDS,
	PROB_COMBINED_HAIL_WIND,
} from '@/data/text/convective/watch-products'
import type { WatchAttributes, WatchProbabilities } from '@/types/text/convective/watch'
import { decodeAttributes, getProbabilityClass, getTypeClass } from '@/util/text/convective/watch-functions'
import { useRouter } from 'next/navigation'
import styles from './WatchSummaryCard.module.scss'

interface WatchSummaryCardProps {
	number: string
	watchType: string
	notActive: boolean
	timeBegin: string
	timeEnd: string
	states: string[]
	attributes?: WatchAttributes
	probabilities?: WatchProbabilities
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
	// Guard against null/undefined attributes with detailed logging
	if (!attributes) {
		console.warn(`Watch ${number} has null or undefined attributes. Expected attributes object.`, { attributes })
	}
	const decodedAttributes = decodeAttributes(attributes)
	const router = useRouter()

	const handleClick = () => {
		router.push(`/weather-data/text-hazards-outlooks/spc-convective-weather/watches/${number}/${CONVECTIVE_WATCH_DISCUSSION}/latest`)
	}

	return (
		<div className={styles.watchSummaryCard} onClick={handleClick}>
			<div className={`${styles.header} ${getTypeClass(watchType, notActive, styles)}`}>
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
							{CONVECTIVE_WATCH_ATTRIBUTES_IDS.map((attrKey) => {
								const attrData = decodedAttributes[attrKey]
								if (!attrData) return null
								const attrConfig = CONVECTIVE_WATCH_ATTRIBUTES[attrKey]
								return (
									<div key={attrKey} className={styles.attributeItem} title={attrConfig.title}>
										<span className={styles.attrLabel}>{attrConfig.label}:</span>
										<span className={styles.attrValue}>{attrData.value}</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>

				{probabilities && Object.keys(probabilities).length > 0 && (
					<div className={styles.probabilitiesSection}>
						<div className={styles.sectionTitle}>Probabilities</div>
						<div className={styles.probsList}>
							{CONVECTIVE_WATCH_PROBABILITIES_IDS.filter((key) => key !== PROB_COMBINED_HAIL_WIND).map((key) => {
								const value = probabilities[key as keyof WatchProbabilities]
								if (!value) return null
								const probConfig = CONVECTIVE_WATCH_PROBABILITIES[key]
								return (
									<div key={key} className={styles.probItem} title={probConfig.title}>
										<span className={styles.probLabel}>{probConfig.label}:</span>
										<span className={`${styles.probValue} ${!notActive ? getProbabilityClass(value, styles) : ''}`}>{value}</span>
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
