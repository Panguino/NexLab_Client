'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CONVECTIVE_WATCH_PRODUCTS } from '@/data/text/convective/watch-products'
import type { WatchAttributes, WatchProbabilities } from '@/types/text/convective/watch'
import { getWatchDetails } from '@/util/dataCalls/text/query-convective'
import { getTypeClass } from '@/util/text/convective/watch-functions'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './ConvectiveWatchDetailPage.module.scss'
import { WatchDetailsPanel } from './WatchDetailsPanel/WatchDetailsPanel'

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
	watchId: string
	watchProdId: string
	watchValidId: string
}

export const ConvectiveWatchDetailPage = ({ watchId, watchProdId, watchValidId }: ConvectiveWatchDetailPageProps) => {
	const [watchData, setWatchData] = useState<WatchData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingText, setIsLoadingText] = useState(true)

	const router = useRouter()

	// Fetch watch details only when watchId changes
	useEffect(() => {
		const fetchWatchData = async () => {
			try {
				const data = await getWatchDetails(watchId)
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
	}, [watchId])

	// Get the product configuration
	const productConfig = CONVECTIVE_WATCH_PRODUCTS[watchProdId]
	const feedKey = productConfig?.feedKey

	// Create sorted options for the Select from available valid times
	const validTimeOptions = useMemo(() => {
		if (!watchData?.urls || !feedKey) return []

		const productUrls = watchData.urls[feedKey as keyof WatchUrls]
		if (!productUrls || productUrls.length === 0) return []

		// Extract timestamps from URLs (last 12 digits in the URL path)
		const timestamps = productUrls
			.map((url) => {
				// Match 12 digits at the end of the URL (with or without file extension)
				const match = url.match(/(\d{12})(?:\.[^.]+)?$/)
				return match ? match[1] : null
			})
			.filter((ts): ts is string => ts !== null)

		// Sort timestamps in descending order (newest first)
		const sorted = [...new Set(timestamps)].sort((a, b) => b.localeCompare(a))

		// Format timestamps for display: YYYYMMDDHHmm -> HH:mm MM/DD/YYYY
		return sorted.map((timestamp) => {
			const year = timestamp.substring(0, 4)
			const month = timestamp.substring(4, 6)
			const day = timestamp.substring(6, 8)
			const hour = timestamp.substring(8, 10)
			const minute = timestamp.substring(10, 12)

			return {
				value: timestamp,
				label: `${hour}:${minute} ${month}/${day}/${year}`,
			}
		})
	}, [watchData, feedKey])

	// Determine the actual validtime to use
	const actualValidId = useMemo(() => {
		if (!watchData?.urls || !feedKey) return null

		const productUrls = watchData.urls[feedKey as keyof WatchUrls]
		if (!productUrls || productUrls.length === 0) return null

		// If watchValidId is 'latest', use the first (newest) timestamp
		if (watchValidId === 'latest' && validTimeOptions.length > 0) {
			return validTimeOptions[0].value
		}

		// Check if the requested validtime exists
		const exists = validTimeOptions.some((opt) => opt.value === watchValidId)
		if (!exists) {
			// If not found, use the latest available
			return validTimeOptions[0]?.value || null
		}

		// Otherwise use the provided watchValidId
		return watchValidId
	}, [watchData, feedKey, watchValidId, validTimeOptions])

	// Fetch the text product when product or valid time changes
	useEffect(() => {
		const fetchTextContent = async () => {
			if (!watchData?.urls || !feedKey || !actualValidId) {
				setDisplayText(null)
				setIsLoadingText(false)
				return
			}

			const productUrls = watchData.urls[feedKey as keyof WatchUrls]
			if (!productUrls || productUrls.length === 0) {
				setDisplayText('No products available for this watch')
				setIsLoadingText(false)
				return
			}

			// Find the URL matching the actualValidId
			const matchingUrl = productUrls.find((url) => url.includes(actualValidId))

			if (!matchingUrl) {
				setDisplayText('Product not available for selected time')
				setIsLoadingText(false)
				return
			}

			setIsLoadingText(true)
			try {
				const response = await fetch(matchingUrl)
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
	}, [watchData, feedKey, actualValidId])

	// Handle validtime selection change
	const handleValidTimeChange = (newValidId: string) => {
		const newPath = `/weather-data/text-hazards-outlooks/spc-convective-weather/watches/${watchId}/${watchProdId}/${newValidId}`
		router.push(newPath, { scroll: false })
	}

	// Handle product selection change
	const handleProductChange = (newProdId: string) => {
		const newPath = `/weather-data/text-hazards-outlooks/spc-convective-weather/watches/${watchId}/${newProdId}/latest`
		router.push(newPath, { scroll: false })
	}

	const pageTitle = watchData ? `${watchData.type} Watch #${watchData.number}` : `Watch #${watchId}`

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

	return (
		<ScrollArea>
			<div className={styles.convectiveWatchDetailPage}>
				<div className={`${styles.titleSection} ${getTypeClass(watchData?.type, false, styles)}`}>
					<h1>{pageTitle}</h1>
				</div>{' '}
				<div className={styles.contentSection}>
					<WatchDetailsPanel watchData={watchData} />

					<div className={styles.textPanel}>
						<div className={styles.watchProductsSection}>
							{Object.entries(CONVECTIVE_WATCH_PRODUCTS).map(([prodId, config]) => {
								const urls = watchData.urls[config.feedKey as keyof WatchUrls]
								const isAvailable = urls && urls.length > 0
								const isSelected = prodId === watchProdId

								const handleProductClick = () => {
									if (!isAvailable) return
									handleProductChange(prodId)
								}

								return (
									<div
										key={prodId}
										className={`${styles.watchProduct} ${isSelected ? styles.selected : ''} ${!isAvailable ? styles.disabled : ''}`}
										onClick={handleProductClick}
									>
										{config.title}
									</div>
								)
							})}
						</div>

						{validTimeOptions.length > 1 && (
							<div className={styles.productHeader}>
								<div className={styles.validtimeLabel}>Product Issuance:</div>
								<div className={styles.validtimeSelectWrapper}>
									<Select value={actualValidId || ''} onChange={handleValidTimeChange} options={validTimeOptions} />
								</div>
							</div>
						)}
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
