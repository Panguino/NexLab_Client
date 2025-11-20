'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getWatchDetails } from '@/util/dataCalls/text/query-convective'
import { useEffect, useState } from 'react'
import styles from './ConvectiveWatchDetailPage.module.scss'

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

interface ConvectiveWatchDetailPageProps {
	watchNumber: string
}

export const ConvectiveWatchDetailPage = ({ watchNumber }: ConvectiveWatchDetailPageProps) => {
	const [watchData, setWatchData] = useState<WatchData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingText, setIsLoadingText] = useState(true)

	// Fetch watch details
	useEffect(() => {
		const fetchWatchData = async () => {
			try {
				const data = await getWatchDetails(watchNumber)
				if (data) {
					setWatchData(data)
				}
			} catch (error) {
				console.error('Failed to fetch watch details:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchWatchData()
	}, [watchNumber])

	// Fetch the text product when watchData is available
	useEffect(() => {
		const fetchTextContent = async () => {
			if (!watchData?.urls?.Watch_Notification_Messages) {
				setDisplayText(null)
				setIsLoadingText(false)
				return
			}

			const messages = watchData.urls.Watch_Notification_Messages
			if (messages.length === 0) {
				setDisplayText('No watch notification messages available')
				setIsLoadingText(false)
				return
			}

			// Get the last (most recent) message
			const url = messages[messages.length - 1]

			setIsLoadingText(true)
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const htmlText = await response.text()

				// Extract text from <pre> tag
				const parser = new DOMParser()
				const doc = parser.parseFromString(htmlText, 'text/html')
				const preElement = doc.querySelector('pre')
				const productText = preElement?.textContent || ''

				setDisplayText(productText)
			} catch (error) {
				console.error('Error fetching watch text:', error)
				setDisplayText('Error loading watch product')
			} finally {
				setIsLoadingText(false)
			}
		}

		fetchTextContent()
	}, [watchData])

	// Decode attributes for display
	const decodeAttributes = (attributes: WatchAttributes) => {
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
		if (key === 'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS') return 'Wind >= 65 kts'
		if (key === 'PROB OF 10 OR MORE SEVERE HAIL EVENTS') return 'Severe Hail Events'
		if (key === 'PROB OF 10 OR MORE SEVERE WIND EVENTS') return 'Severe Wind Events'
		if (key === 'PROB OF 2 OR MORE TORNADOES') return 'Tornadoes'
		if (key === 'PROB OF 6 OR MORE COMBINED SEVERE HAIL/WIND EVENTS') return null // Omit combined
		return key
	}

	// Format product names for URL keys
	const formatProductName = (key: string): string => {
		return key.replace(/_/g, ' ')
	}

	// Determine color coding based on watch type
	const getTypeClass = () => {
		if (watchData?.type === 'Tornado') return styles.tornado
		if (watchData?.type === 'Severe Thunderstorm') return styles.severeThunderstorm
		return styles.default
	}

	// Format time string
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

	const pageTitle = watchData ? `${watchData.type} Watch #${watchData.number}` : `Watch #${watchNumber}`

	if (isLoading) {
		return (
			<ScrollArea>
				<div className={styles.convectiveWatchDetailPage}>
					<div className={styles.titleSection}>
						<h1>Loading watch details...</h1>
					</div>
				</div>
			</ScrollArea>
		)
	}

	if (!watchData) {
		return (
			<ScrollArea>
				<div className={styles.convectiveWatchDetailPage}>
					<div className={styles.titleSection}>
						<h1>Watch Not Found</h1>
					</div>
				</div>
				<Footer />
			</ScrollArea>
		)
	}

	const decodedAttributes = decodeAttributes(watchData.attributes)

	return (
		<ScrollArea>
			<div className={styles.convectiveWatchDetailPage}>
				<div className={`${styles.titleSection} ${getTypeClass()}`}>
					<h1>{pageTitle}</h1>
				</div>

				<div className={styles.contentSection}>
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
									<span className={styles.label}>States:</span>
									<span className={styles.value}>{watchData.states.join(', ')}</span>
								</div>
							)}

							{Object.keys(decodedAttributes).length > 0 && (
								<div className={styles.attributesSection}>
									<h3>Attributes</h3>
									<div className={styles.attributesGrid}>
										{Object.entries(decodedAttributes).map(([key, value]) => (
											<div key={key} className={styles.attributeItem}>
												<span className={styles.attrLabel}>{key}:</span>
												<span className={styles.attrValue}>{value}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{Object.keys(watchData.probabilities).length > 0 && (
								<div className={styles.probabilitiesSection}>
									<h3>Probabilities</h3>
									<div className={styles.probsList}>
										{[
											'PROB OF 2 OR MORE TORNADOES',
											'PROB OF 1 OR MORE STRONG /EF2-EF5/ TORNADOES',
											'PROB OF 10 OR MORE SEVERE HAIL EVENTS',
											'PROB OF 1 OR MORE HAIL EVENTS >= 2 INCHES',
											'PROB OF 10 OR MORE SEVERE WIND EVENTS',
											'PROB OF 1 OR MORE WIND EVENTS >= 65 KNOTS',
										].map((key) => {
											const value = watchData.probabilities[key as keyof WatchProbabilities]
											if (!value) return null
											const label = formatProbabilityLabel(key)
											if (label === null) return null
											return (
												<div key={key} className={styles.probItem}>
													<span className={styles.probLabel}>{label}:</span>
													<span className={styles.probValue}>{value}</span>
												</div>
											)
										})}
									</div>
								</div>
							)}

							{watchData.urls && Object.keys(watchData.urls).length > 0 && (
								<div className={styles.productsSection}>
									<h3>Associated Products</h3>
									<div className={styles.productsList}>
										{Object.entries(watchData.urls).map(([key, urls]) => {
											if (!urls || urls.length === 0) return null
											return (
												<div key={key} className={styles.productCategory}>
													<div className={styles.productLabel}>{formatProductName(key)}</div>
													<div className={styles.productCount}>
														{urls.length} product{urls.length !== 1 ? 's' : ''}
													</div>
												</div>
											)
										})}
									</div>
								</div>
							)}
						</div>
					</div>

					<div className={styles.textPanel}>
						<div className={styles.textContent}>
							{isLoadingText ? (
								<p>Loading watch product...</p>
							) : displayText ? (
								<pre className={styles.productText}>{displayText}</pre>
							) : (
								<p>No watch product available</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
