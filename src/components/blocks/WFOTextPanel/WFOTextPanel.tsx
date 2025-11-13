'use client'

import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useRootStore } from '@/store/useRootStore'
import { productURLtoText } from '@/util/dataCalls/text/query-wfo'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './WFOTextPanel.module.scss'

export const WFOTextPanel: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()
	const wfoTextContent = useRootStore.use.wfoTextContent()

	const [displayText, setDisplayText] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	// Extract the timestamps and create sorted options for the Select
	const validtimeOptions = useMemo(() => {
		if (!wfoTextContent?.productData) return []

		const timestamps = Object.keys(wfoTextContent.productData)

		// Sort timestamps in descending order (newest first)
		const sorted = timestamps.sort((a, b) => b.localeCompare(a))

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
	}, [wfoTextContent?.productData])

	// Helper function to find the closest available validtime
	const findClosestValidtime = (targetTime: string, availableTimes: string[]): string => {
		if (availableTimes.length === 0) return 'latest'
		if (availableTimes.includes(targetTime)) return targetTime

		// Find the closest time (prefer earlier times if equidistant)
		let closest = availableTimes[0]
		let minDiff = Math.abs(parseInt(targetTime) - parseInt(availableTimes[0]))

		for (const time of availableTimes) {
			const diff = Math.abs(parseInt(targetTime) - parseInt(time))
			if (diff < minDiff) {
				minDiff = diff
				closest = time
			}
		}

		return closest
	}

	// Determine the actual validtime to use
	const actualValidtimeId = useMemo(() => {
		if (!wfoTextContent) return null

		const { validtimeId, productData } = wfoTextContent
		const availableTimestamps = Object.keys(productData)

		// If validtimeId is 'latest', use the first (newest) timestamp
		if (validtimeId === 'latest' && validtimeOptions.length > 0) {
			return validtimeOptions[0].value
		}

		// Check if the requested validtime exists in the product data
		if (!productData[validtimeId]) {
			// Find the closest available validtime
			return findClosestValidtime(validtimeId, availableTimestamps)
		}

		// Otherwise use the provided validtimeId
		return validtimeId
	}, [wfoTextContent, validtimeOptions])

	// Auto-update URL if the validtime changed to the closest available
	useEffect(() => {
		if (!wfoTextContent || !actualValidtimeId) return

		const { validtimeId, productData } = wfoTextContent

		// If the URL validtime doesn't exist in product data and we've found a closest match
		if (validtimeId !== 'latest' && !productData[validtimeId] && actualValidtimeId !== validtimeId) {
			// Update the URL to use the closest available validtime
			const pathParts = pathname.split('/')
			const wfoIndex = pathParts.findIndex((part) => part === 'nws-wfo-national-weather-service-forecast-offices')

			if (wfoIndex !== -1 && pathParts.length > wfoIndex + 3) {
				pathParts[wfoIndex + 3] = actualValidtimeId
				const newPath = pathParts.join('/')
				router.replace(newPath) // Use replace instead of push to avoid adding to history
			}
		}
	}, [wfoTextContent, actualValidtimeId, pathname, router])

	// Fetch and display the product text when data changes
	useEffect(() => {
		const fetchProductText = async () => {
			if (!wfoTextContent || !actualValidtimeId) {
				setDisplayText(null)
				return
			}

			const { productData } = wfoTextContent
			const url = productData[actualValidtimeId]

			if (!url) {
				setDisplayText('Product not available for selected time')
				return
			}

			setLoading(true)
			try {
				const text = await productURLtoText(url)
				setDisplayText(text)
			} catch (error) {
				console.error('Error fetching WFO product text:', error)
				setDisplayText('Error loading product')
			} finally {
				setLoading(false)
			}
		}

		fetchProductText()
	}, [wfoTextContent, actualValidtimeId])

	// Handle validtime selection change
	const handleValidtimeChange = (newValidtimeId: string) => {
		if (!wfoTextContent) return

		// Update the URL to reflect the new validtime
		// Parse the current pathname to replace the validtime segment
		const pathParts = pathname.split('/')
		const wfoIndex = pathParts.findIndex((part) => part === 'nws-wfo-national-weather-service-forecast-offices')

		if (wfoIndex !== -1 && pathParts.length > wfoIndex + 3) {
			// Replace the validtime segment (wfoIndex + 3)
			pathParts[wfoIndex + 3] = newValidtimeId
			const newPath = pathParts.join('/')
			router.push(newPath)
		}
	}

	// Render content
	let content: React.ReactNode = null

	if (!wfoTextContent) {
		content = <div className={styles.placeholderMessage}>No WFO product selected</div>
	} else if (loading) {
		content = <div className={styles.placeholderMessage}>Loading product...</div>
	} else if (displayText) {
		content = (
			<>
				<div className={styles.productHeader}>
					<h2 className={styles.productName}>
						{wfoTextContent.productName}
						{wfoTextContent.officeName && <span className={styles.officeName}> - {wfoTextContent.officeName}</span>}
					</h2>
				</div>
				{validtimeOptions.length > 1 && (
					<div className={styles.validtimeSelector}>
						<div className={styles.validtimeLabel}>Product Issuance:</div>
						<div className={styles.validtimeSelectWrapper}>
							<Select value={actualValidtimeId || ''} onChange={handleValidtimeChange} options={validtimeOptions} />
						</div>
					</div>
				)}
				<pre className={styles.wfoText}>{displayText}</pre>
			</>
		)
	} else {
		content = <div className={styles.placeholderMessage}>No content available</div>
	}

	return (
		<ScrollArea>
			<div className={styles.wfoTextPanel}>{content}</div>
		</ScrollArea>
	)
}

export default WFOTextPanel
