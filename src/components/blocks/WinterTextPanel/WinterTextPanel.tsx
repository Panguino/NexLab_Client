'use client'

import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useRootStore } from '@/store/useRootStore'
import { productURLtoText } from '@/util/dataCalls/text/query-winter'
import { useEffect, useMemo, useState } from 'react'
import styles from './WinterTextPanel.module.scss'

export const WinterTextPanel: React.FC = () => {
	const winterTextContent = useRootStore.use.winterTextContent()

	const [displayText, setDisplayText] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [selectedValidtime, setSelectedValidtime] = useState<string | null>(null)

	// Extract the timestamps and create sorted options for the Select
	const validtimeOptions = useMemo(() => {
		if (!winterTextContent?.productData) return []

		const timestamps = Object.keys(winterTextContent.productData)

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
	}, [winterTextContent?.productData])

	// Set initial validtime to the most recent when content changes
	useEffect(() => {
		if (validtimeOptions.length > 0 && !selectedValidtime) {
			setSelectedValidtime(validtimeOptions[0].value)
		}
	}, [validtimeOptions, selectedValidtime])

	// Reset selected validtime when content changes
	useEffect(() => {
		if (winterTextContent?.productData) {
			const timestamps = Object.keys(winterTextContent.productData).sort((a, b) => b.localeCompare(a))
			if (timestamps.length > 0) {
				setSelectedValidtime(timestamps[0])
			}
		}
	}, [winterTextContent?.productData])

	// Fetch and display the product text when data changes
	useEffect(() => {
		const fetchProductText = async () => {
			if (!winterTextContent || !selectedValidtime) {
				setDisplayText(null)
				return
			}

			const { productData } = winterTextContent
			const url = productData[selectedValidtime]

			if (!url) {
				setDisplayText('Product not available for selected time')
				return
			}

			setLoading(true)
			try {
				const text = await productURLtoText(url)
				setDisplayText(text)
			} catch (error) {
				console.error('Error fetching Winter product text:', error)
				setDisplayText('Error loading product')
			} finally {
				setLoading(false)
			}
		}

		fetchProductText()
	}, [winterTextContent, selectedValidtime])

	// Handle validtime selection change
	const handleValidtimeChange = (newValidtimeId: string) => {
		setSelectedValidtime(newValidtimeId)
	}

	// Render content
	let content: React.ReactNode = null

	if (!winterTextContent) {
		content = <div className={styles.placeholderMessage}>No Winter product selected</div>
	} else if (loading) {
		content = <div className={styles.placeholderMessage}>Loading product...</div>
	} else if (displayText) {
		content = (
			<>
				<div className={styles.productHeader}>
					<h2 className={styles.productName}>{winterTextContent.productName}</h2>
				</div>
				{validtimeOptions.length > 1 && (
					<div className={styles.validtimeSelector}>
						<div className={styles.validtimeLabel}>Product Issuance:</div>
						<div className={styles.validtimeSelectWrapper}>
							<Select value={selectedValidtime || ''} onChange={handleValidtimeChange} options={validtimeOptions} />
						</div>
					</div>
				)}
				<pre className={styles.winterText}>{displayText}</pre>
			</>
		)
	} else {
		content = <div className={styles.placeholderMessage}>No content available</div>
	}

	return (
		<ScrollArea>
			<div className={styles.winterTextPanel}>{content}</div>
		</ScrollArea>
	)
}

export default WinterTextPanel
