'use client'

import {
	CONVECTIVE_WATCH_ATTRIBUTES,
	CONVECTIVE_WATCH_ATTRIBUTES_IDS,
	CONVECTIVE_WATCH_PROBABILITIES,
	CONVECTIVE_WATCH_PROBABILITIES_IDS,
} from '@/data/text/convective/watch-products'
import type { WatchAttributes, WatchProbabilities } from '@/types/text/convective/watch'
import { decodeAttributes, getProbabilityClass } from '@/util/text/convective/watch-functions'
import styles from './WatchDetailsPanel.module.scss'

interface WatchUrls {
	Watch_Notification_Messages?: string[]
	Watch_Outlines?: string[]
	Watch_Probabilities?: string[]
	Watch_Status_Reports?: string[]
	Watch_Aviation_Notification_Messages?: string[]
}

interface WatchData {
	number: string
	type: string
	time_begin_dt: string
	time_end_dt: string
	states: string[]
	attributes: WatchAttributes
	probabilities: WatchProbabilities
	graphic: string
	urls: WatchUrls
}

interface WatchDetailsPanelProps {
	watchData: WatchData
}

export const WatchDetailsPanel = ({ watchData }: WatchDetailsPanelProps) => {
	const formatTime = (timeStr: string) => {
		try {
			const date = new Date(timeStr)
			return date.toLocaleString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				timeZoneName: 'short',
			})
		} catch {
			return timeStr
		}
	}

	const decodedAttributes = decodeAttributes(watchData.attributes)

	return (
		<div className={styles.detailsPanel}>
			<div className={styles.graphicSection}>
				<img src={watchData.graphic} alt={`Watch ${watchData.number}`} className={styles.graphic} />
			</div>

			<div className={styles.infoSection}>
				<div className={styles.timeInfo}>
					<div className={styles.infoItem}>
						<span className={styles.label}>Valid:</span>
						<span className={styles.value}>{formatTime(watchData.time_begin_dt)}</span>
					</div>
					<div className={styles.infoItem}>
						<span className={styles.label}>Until:</span>
						<span className={styles.value}>{formatTime(watchData.time_end_dt)}</span>
					</div>
				</div>
				{watchData.states.length > 0 && (
					<div className={styles.statesInfo}>
						<span className={styles.label}>States Affected:</span>
						<span className={styles.value}>{watchData.states.join(', ')}</span>
					</div>
				)}
				{Object.keys(decodedAttributes).length > 0 && (
					<div className={styles.attributesSection}>
						<div className={styles.sectionTitle}>Attributes</div>
						<div className={styles.attributesGrid}>
							{CONVECTIVE_WATCH_ATTRIBUTES_IDS.map((attrKey) => {
								const attr = decodedAttributes[attrKey]
								if (!attr) return null
								const attrConfig = CONVECTIVE_WATCH_ATTRIBUTES[attrKey]
								return (
									<div key={attrKey} className={styles.attributeItem} title={attrConfig.title}>
										<span className={styles.attrLabel}>{attrConfig.label}:</span>
										<span className={`${styles.attrValue} ${attr.isHighThreshold ? styles.highThreshold : ''}`}>
											{attr.value}
										</span>
									</div>
								)
							})}
						</div>
					</div>
				)}
				{Object.keys(watchData.probabilities).length > 0 && (
					<div className={styles.probabilitiesSection}>
						<div className={styles.sectionTitle}>Probabilities</div>
						<div className={styles.probsList}>
							{CONVECTIVE_WATCH_PROBABILITIES_IDS.map((key) => {
								const value = watchData.probabilities[key as keyof WatchProbabilities]
								if (!value) return null
								const probConfig = CONVECTIVE_WATCH_PROBABILITIES[key]
								return (
									<div key={key} className={styles.probItem} title={probConfig.title}>
										<span className={styles.probLabel}>{probConfig.label}:</span>
										<span className={`${styles.probValue} ${getProbabilityClass(value, styles)}`}>{value}</span>
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
