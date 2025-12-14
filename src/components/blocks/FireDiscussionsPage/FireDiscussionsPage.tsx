'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { FIRE_DROUGHT_DISCUSSION_PRODUCTS } from '@/data/text/fire/products'
import { getFireDroughtDiscussions } from '@/util/dataCalls/text/query-fire'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './FireDiscussionsPage.module.scss'

interface FireDiscussionsPageProps {
	productId: string
	regionId: string
	validTime: string
}

interface USDMData {
	id: number
	title: string
	discussion: {
		summary: string[]
		regions: Array<{ name: string; discussion: string[] }>
		extended: string[]
	}
	authors: string[]
}

export const FireDiscussionsPage = ({ productId, regionId, validTime }: FireDiscussionsPageProps) => {
	const router = useRouter()
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)

	const product = FIRE_DROUGHT_DISCUSSION_PRODUCTS[productId]
	const pageTitle = product ? product.name : 'Fire & Drought Discussion'
	const isUSDM = productId === 'usdm'
	const fireBasePath = '/weather-data/text-hazards-outlooks/fire-drought'

	// Create sorted options for the Select from available validtimes
	const validtimeOptions = useMemo(() => {
		if (!textData) return []

		const timestamps = Object.keys(textData)

		// Sort timestamps in descending order (newest first)
		const sorted = timestamps.sort((a, b) => b.localeCompare(a))

		// Format timestamps for display
		// FWO: YYYYMMDDHHmm -> HH:mm MM/DD/YYYY
		// USDM: YYYYMMDD -> MM/DD/YYYY
		return sorted.map((timestamp) => {
			const year = timestamp.substring(0, 4)
			const month = timestamp.substring(4, 6)
			const day = timestamp.substring(6, 8)

			if (isUSDM) {
				return {
					value: timestamp,
					label: `${month}/${day}/${year}`,
				}
			} else {
				const hour = timestamp.substring(8, 10)
				const minute = timestamp.substring(10, 12)
				return {
					value: timestamp,
					label: `${hour}:${minute} ${month}/${day}/${year}`,
				}
			}
		})
	}, [textData, isUSDM])

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
		const fetchData = async () => {
			setIsLoadingData(true)
			try {
				const data = await getFireDroughtDiscussions(productId)
				if (data) {
					setTextData(data)
				}
			} catch (error) {
				console.error('Failed to fetch fire drought discussion data:', error)
			} finally {
				setIsLoadingData(false)
			}
		}

		fetchData()
	}, [productId])

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
				setDisplayText('Content not available for selected time')
				setIsLoadingText(false)
				return
			}

			setIsLoadingText(true)
			try {
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				if (isUSDM) {
					// USDM returns JSON with structured data
					const jsonData: USDMData = await response.json()
					// For now, combine summary and region discussions into text
					let fullText = jsonData.title + '\n\n'
					fullText += '=== SUMMARY ===\n\n'
					fullText += jsonData.discussion.summary.join('\n\n')
					fullText += '\n\n'

					// Add region discussions
					for (const region of jsonData.discussion.regions) {
						fullText += `=== ${region.name.toUpperCase()} ===\n\n`
						fullText += region.discussion.join('\n\n')
						fullText += '\n\n'
					}

					// Add extended outlook
					if (jsonData.discussion.extended && jsonData.discussion.extended.length > 0) {
						fullText += '=== EXTENDED OUTLOOK ===\n\n'
						fullText += jsonData.discussion.extended.join('\n\n')
					}

					// Add authors
					if (jsonData.authors && jsonData.authors.length > 0) {
						fullText += '\n\n=== AUTHORS ===\n\n'
						fullText += jsonData.authors.join('\n')
					}

					setDisplayText(fullText)
				} else {
					// FWO products return HTML with text in <pre> tag
					const htmlText = await response.text()
					const parser = new DOMParser()
					const doc = parser.parseFromString(htmlText, 'text/html')
					const preElement = doc.querySelector('pre')
					const productText = preElement?.textContent || ''
					setDisplayText(productText)
				}
			} catch (error) {
				console.error('Error fetching text content:', error)
				setDisplayText('Error loading content')
			} finally {
				setIsLoadingText(false)
			}
		}

		fetchTextContent()
	}, [textData, actualValidtimeId, isUSDM])

	// Handle validtime selection change
	const handleValidtimeChange = (newValidtimeId: string) => {
		const newPath = `${fireBasePath}/discussions/${productId}/${regionId}/${newValidtimeId}`
		router.push(newPath)
	}

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.fireDiscussionsPage}>
					<div className={styles.titleSection}>
						<h1>{pageTitle}</h1>
					</div>
					<div className={styles.contentSection}>
						<div className={styles.loadingMessage}>Loading...</div>
					</div>
				</div>
				<Footer />
			</ScrollArea>
		)
	}

	return (
		<ScrollArea>
			<div className={styles.fireDiscussionsPage}>
				<div className={styles.titleSection}>
					<h1>{pageTitle}</h1>
				</div>

				<div className={styles.contentSection}>
					{validtimeOptions.length > 0 && (
						<div className={styles.validtimeSelector}>
							<div className={styles.validtimeLabel}>Product Issuance:</div>
							<div className={styles.validtimeSelectWrapper}>
								<Select value={actualValidtimeId || ''} onChange={handleValidtimeChange} options={validtimeOptions} />
							</div>
						</div>
					)}
					<div className={styles.textContent}>
						{isLoadingText ? (
							<p>Loading content...</p>
						) : displayText ? (
							<pre className={styles.discussionText}>{displayText}</pre>
						) : (
							<p>No content available</p>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</ScrollArea>
	)
}
