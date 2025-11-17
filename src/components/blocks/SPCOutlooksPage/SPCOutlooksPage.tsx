'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CONVECTIVE_PRODUCTS } from '@/data/text/convective/products'
import { getConvectiveOutlookGraphics, getConvectiveOutlookTextData } from '@/util/dataCalls/text/query-convective'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './SPCOutlooksPage.module.scss'

interface SPCOutlooksPageProps {
	productId: string
	validTime: string
}

interface GraphicData {
	url: string
	period: string
	type: string
}

interface OutlookGraphicsData {
	graphics: GraphicData[]
	img: {
		height: number
		width: number
	}
}

export const SPCOutlooksPage = ({ productId, validTime }: SPCOutlooksPageProps) => {
	const router = useRouter()
	const [graphicsData, setGraphicsData] = useState<OutlookGraphicsData | null>(null)
	const [isLoadingGraphics, setIsLoadingGraphics] = useState(true)
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingText, setIsLoadingText] = useState(true)

	const product = CONVECTIVE_PRODUCTS[productId]
	const pageTitle = product ? `SPC Convective Outlook ${product.title}` : 'SPC Convective Outlook'

	// Create sorted options for the Select from available validtimes
	const validtimeOptions = useMemo(() => {
		if (!textData) return []

		const timestamps = Object.keys(textData)

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
	}, [textData])

	// Determine the actual validtime to use
	const actualValidtimeId = useMemo(() => {
		if (!textData) return null

		// If validTime is 'latest', use the first (newest) timestamp
		if (validTime === 'latest' && validtimeOptions.length > 0) {
			return validtimeOptions[0].value
		}

		// Check if the requested validtime exists in the text data
		if (!textData[validTime]) {
			// If not found, use the latest available
			return validtimeOptions[0]?.value || null
		}

		// Otherwise use the provided validTime
		return validTime
	}, [textData, validTime, validtimeOptions])

	// Fetch text data (list of available validtimes)
	useEffect(() => {
		const fetchTextData = async () => {
			try {
				const data = await getConvectiveOutlookTextData(productId)
				if (data) {
					setTextData(data)
				}
			} catch (error) {
				console.error('Failed to fetch outlook text data:', error)
			}
		}

		fetchTextData()
	}, [productId])

	// Fetch graphics
	useEffect(() => {
		const fetchGraphics = async () => {
			try {
				const data = await getConvectiveOutlookGraphics(productId, validTime)
				if (data) {
					setGraphicsData(data)
				}
			} catch (error) {
				console.error('Failed to fetch outlook graphics:', error)
			} finally {
				setIsLoadingGraphics(false)
			}
		}

		fetchGraphics()
	}, [productId, validTime])

	// Fetch the actual text content when actualValidtimeId changes
	useEffect(() => {
		const fetchTextContent = async () => {
			if (!textData || !actualValidtimeId) {
				setDisplayText(null)
				setIsLoadingText(false)
				return
			}

			const url = textData[actualValidtimeId]

			if (!url) {
				setDisplayText('Discussion not available for selected time')
				setIsLoadingText(false)
				return
			}

			setIsLoadingText(true)
			try {
				// Fetch the HTML content
				const htmlResponse = await fetch(url)
				if (!htmlResponse.ok) {
					throw new Error(`HTTP error! status: ${htmlResponse.status}`)
				}
				const htmlText = await htmlResponse.text()

				// Extract text from <pre> tag
				const parser = new DOMParser()
				const doc = parser.parseFromString(htmlText, 'text/html')
				const preElement = doc.querySelector('pre')
				const productText = preElement?.textContent || ''

				setDisplayText(productText)
			} catch (error) {
				console.error('Error fetching outlook text:', error)
				setDisplayText('Error loading discussion')
			} finally {
				setIsLoadingText(false)
			}
		}

		fetchTextContent()
	}, [textData, actualValidtimeId])

	// Handle validtime selection change
	const handleValidtimeChange = (newValidtimeId: string) => {
		// Update the URL to reflect the new validtime
		const newPath = `/weather-data/text-hazards-outlooks/spc-convective-weather/outlooks/${productId}/${newValidtimeId}`
		router.push(newPath)
	}

	return (
		<ScrollArea>
			<div className={styles.spcOutlooksPage}>
				<div className={styles.titleSection}>
					<h1>{pageTitle}</h1>
					<p className={styles.validTime}>Valid Time: {validTime}</p>
				</div>

				<div className={styles.contentSection}>
					<div className={styles.graphicsPanel}>
						<h2>Graphics</h2>
						<div className={styles.graphicsContainer}>
							{isLoadingGraphics ? (
								<div className={styles.graphicPlaceholder}>
									<p>Loading graphics...</p>
								</div>
							) : graphicsData?.graphics && graphicsData.graphics.length > 0 ? (
								graphicsData.graphics.map((graphic, index) => (
									<div key={index} className={styles.graphicItem}>
										<p className={styles.graphicLabel}>
											Day {graphic.period} - {graphic.type} Risk
										</p>
										<img src={graphic.url} alt={`Day ${graphic.period} - ${graphic.type} Risk`} className={styles.graphic} />
									</div>
								))
							) : (
								<div className={styles.graphicPlaceholder}>
									<p>No graphics available</p>
								</div>
							)}
						</div>
					</div>

					<div className={styles.textPanel}>
						<h2>Discussion</h2>
						{validtimeOptions.length > 1 && (
							<div className={styles.validtimeSelector}>
								<div className={styles.validtimeLabel}>Product Issuance:</div>
								<div className={styles.validtimeSelectWrapper}>
									<Select value={actualValidtimeId || ''} onChange={handleValidtimeChange} options={validtimeOptions} />
								</div>
							</div>
						)}
						<div className={styles.textContent}>
							{isLoadingText ? (
								<p>Loading discussion...</p>
							) : displayText ? (
								<pre className={styles.discussionText}>{displayText}</pre>
							) : (
								<p>No discussion available</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
