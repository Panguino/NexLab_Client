'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { ADMIN_TEXT_PRODUCTS } from '@/data/text/administrative/products'
import { getAdminTextProductHistory } from '@/util/dataCalls/text/query-administrative'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './AdminProductPage.module.scss'

interface AdminProductPageProps {
	officeId: string
	productId: string
	validTime: string
}

export const AdminProductPage = ({ officeId, productId, validTime }: AdminProductPageProps) => {
	const router = useRouter()
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)

	// Determine product type from productId
	// Admin product keys have format like: NOUS42_ADASDM, NOUS71_ADMERH, ACUS41_SCCNS1, etc.
	const productType = useMemo(() => {
		// Extract the product type code from after the underscore
		const match = productId.match(/_([A-Z]{3})/)
		if (match) {
			const code = match[1]
			// Map to our product IDs
			if (code === 'ADA') return 'ADA'
			if (code === 'ADM') return 'ALM'
			if (code === 'PNS') return 'PNS'
			if (code === 'SCC') return 'SCC'
		}
		return null
	}, [productId])

	const pageTitle = productType ? ADMIN_TEXT_PRODUCTS[productType]?.name : 'Administrative Product'
	const adminBasePath = '/weather-data/text-hazards-outlooks/admin-products'

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
		const fetchData = async () => {
			setIsLoadingData(true)
			try {
				const data = await getAdminTextProductHistory(officeId, productId)
				if (data) {
					setTextData(data)
				}
			} catch (error) {
				console.error('Failed to fetch admin product data:', error)
			} finally {
				setIsLoadingData(false)
			}
		}

		fetchData()
	}, [officeId, productId])

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

				// Admin products return HTML with text in <pre> tag
				const htmlText = await response.text()
				const parser = new DOMParser()
				const doc = parser.parseFromString(htmlText, 'text/html')
				const preElement = doc.querySelector('pre')
				const productText = preElement?.textContent || ''
				setDisplayText(productText)
			} catch (error) {
				console.error('Error fetching text content:', error)
				setDisplayText('Error loading content')
			} finally {
				setIsLoadingText(false)
			}
		}

		fetchTextContent()
	}, [textData, actualValidtimeId])

	// Handle validtime selection change
	const handleValidtimeChange = (newValidtimeId: string) => {
		const newPath = `${adminBasePath}/${officeId}/${productId}/${newValidtimeId}`
		router.push(newPath)
	}

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.adminProductPage}>
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
			<div className={styles.adminProductPage}>
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
							<pre className={styles.productText}>{displayText}</pre>
						) : (
							<p>No content available</p>
						)}
					</div>
				</div>
			</div>
			<MobileIconNav tab />
			<Footer />
		</ScrollArea>
	)
}
