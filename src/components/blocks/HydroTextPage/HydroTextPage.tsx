'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { HYDRO_TEXT_PRODUCTS } from '@/data/text/hydrological/products'
import { getHydroGeneralTextProducts, getHydroTextProductById } from '@/util/dataCalls/text/query-hydrological'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './HydroTextPage.module.scss'

interface HydroTextPageProps {
	productId: string
	validTime: string
}

interface TextProduct {
	date: string
	location: string
	office: string
	productQueryString: string
	title: string
	url: string
}

export const HydroTextPage = ({ productId, validTime }: HydroTextPageProps) => {
	const router = useRouter()
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [productInfo, setProductInfo] = useState<TextProduct | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)

	const hydroBasePath = '/weather-data/text-hazards-outlooks/nws-rfc-hydrological'

	// Find the category label for this product
	const categoryLabel = useMemo(() => {
		// Get general text products to find which category this product belongs to
		return 'Hydrological Text Product'
	}, [])

	// Page title from product info
	const pageTitle = useMemo(() => {
		if (productInfo) {
			return `${productInfo.location} - ${productInfo.office}`
		}
		return 'Loading...'
	}, [productInfo])

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
			if (!productId) return

			setIsLoadingData(true)
			try {
				const data = await getHydroTextProductById(productId)
				if (data) {
					setTextData(data)
				}

				// Also fetch product info from general text products
				const generalProducts = await getHydroGeneralTextProducts()
				if (generalProducts) {
					// Search for this product across all categories
					for (const categoryId of Object.keys(HYDRO_TEXT_PRODUCTS)) {
						if (generalProducts[categoryId]) {
							const products = generalProducts[categoryId]
							for (const product of Object.values(products) as TextProduct[]) {
								if (product.productQueryString === productId) {
									setProductInfo(product)
									break
								}
							}
						}
					}
				}
			} catch (error) {
				console.error('Failed to fetch hydrological product data:', error)
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

				// Products return HTML with text in <pre> tag
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
		const newPath = `${hydroBasePath}/text/${productId}/${newValidtimeId}`
		router.push(newPath)
	}

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.hydroTextPage}>
					<div className={styles.titleSection}>
						<span className={styles.category}>{categoryLabel}</span>
						<h1>Loading...</h1>
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
			<div className={styles.hydroTextPage}>
				<div className={styles.titleSection}>
					<span className={styles.category}>{categoryLabel}</span>
					<h1>{pageTitle}</h1>
					{productInfo?.title && <p className={styles.subtitle}>{productInfo.title}</p>}
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
			<Footer />
		</ScrollArea>
	)
}
