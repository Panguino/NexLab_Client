'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import {
	ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS,
	ANALYSIS_TEXT_SEL_CITY_PRODUCTS,
	ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS,
} from '@/data/text/analysis/products'
import { getAdditionalRWRProducts, getAnalysisTextProduct, getSpecialAnalysisTextProduct } from '@/util/dataCalls/text/query-analysis'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './AnalysisTextPage.module.scss'

interface AnalysisTextPageProps {
	productId: string
	validTime: string
}

// Combine all product definitions for lookup
const ALL_ANALYSIS_PRODUCTS = {
	...ANALYSIS_TEXT_SEL_CITY_PRODUCTS,
	...ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS,
	...ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS,
}

// Helper to determine if this is a special RWR product (state or station)
const parseSpecialProductId = (productId: string): { type: 'state' | 'station' | null; key: string | null } => {
	if (productId.startsWith('state-')) {
		return { type: 'state', key: productId.replace('state-', '') }
	}
	if (productId.startsWith('station-')) {
		return { type: 'station', key: productId.replace('station-', '') }
	}
	return { type: null, key: null }
}

export const AnalysisTextPage = ({ productId, validTime }: AnalysisTextPageProps) => {
	const router = useRouter()
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)
	const [specialProductInfo, setSpecialProductInfo] = useState<{ location: string; title: string } | null>(null)

	const specialProduct = parseSpecialProductId(productId)
	const isSpecialProduct = specialProduct.type !== null

	const product = ALL_ANALYSIS_PRODUCTS[productId]
	const analysisBasePath = '/weather-data/text-hazards-outlooks/analysis'

	// Determine page title
	const pageTitle = useMemo(() => {
		if (isSpecialProduct && specialProductInfo) {
			return specialProductInfo.location
		}
		return product ? product.label : 'Analysis Product'
	}, [isSpecialProduct, specialProductInfo, product])

	// Determine the category for display
	const productCategory = useMemo(() => {
		if (specialProduct.type === 'state') return 'Regional Weather Roundup - State'
		if (specialProduct.type === 'station') return 'Regional Weather Roundup - Station'
		if (productId in ANALYSIS_TEXT_SEL_CITY_PRODUCTS) return 'Selected City Summary'
		if (productId in ANALYSIS_TEXT_TEMP_WEATHER_TABLE_PRODUCTS) return 'Temperature & Weather Table'
		if (productId in ANALYSIS_TEXT_REGIONAL_ROUNDUP_PRODUCTS) return 'Regional Weather Roundup'
		return 'Analysis Product'
	}, [productId, specialProduct.type])

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
				if (isSpecialProduct && specialProduct.key) {
					// Fetch from additional RWR products endpoint
					const rwrData = await getAdditionalRWRProducts()
					if (rwrData) {
						const category = specialProduct.type === 'state' ? 'states' : 'stations'
						const productData = rwrData[category]?.[specialProduct.key]
						if (productData) {
							// Store product info for title/category display
							setSpecialProductInfo({
								location: productData.location,
								title: productData.title,
							})
							// Fetch the actual data from the product's URL
							const data = await getSpecialAnalysisTextProduct(productData.url)
							if (data) {
								setTextData(data)
							}
						}
					}
				} else {
					// Standard product fetch
					const data = await getAnalysisTextProduct(productId)
					if (data) {
						setTextData(data)
					}
				}
			} catch (error) {
				console.error('Failed to fetch analysis product data:', error)
			} finally {
				setIsLoadingData(false)
			}
		}

		fetchData()
	}, [productId, isSpecialProduct, specialProduct.type, specialProduct.key])

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

				// Analysis products return HTML with text in <pre> tag
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
		const newPath = `${analysisBasePath}/text/${productId}/${newValidtimeId}`
		router.push(newPath)
	}

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.analysisTextPage}>
					<div className={styles.titleSection}>
						<span className={styles.category}>{productCategory}</span>
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
			<div className={styles.analysisTextPage}>
				<div className={styles.titleSection}>
					<span className={styles.category}>{productCategory}</span>
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
			<Footer />
		</ScrollArea>
	)
}
