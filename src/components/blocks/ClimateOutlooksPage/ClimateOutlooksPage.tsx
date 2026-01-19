'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID, CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID, CLIMATE_TEXT_PRODUCTS } from '@/data/text/climate/products'
import { getClimateOutlookData, getClimateTextHistory } from '@/util/dataCalls/text/query-climate'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './ClimateOutlooksPage.module.scss'

interface ClimateOutlooksPageProps {
	productId: string
	validTime: string
}

interface OutlookGraphicsResponse {
	error?: boolean
	files?: {
		temp?: string[]
		prcp?: string[]
	}
	img?: {
		width: number
		height: number
	}
}

export const ClimateOutlooksPage = ({ productId, validTime }: ClimateOutlooksPageProps) => {
	const router = useRouter()
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [outlookGraphics, setOutlookGraphics] = useState<OutlookGraphicsResponse | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)
	const [isLoadingGraphics, setIsLoadingGraphics] = useState(true)

	const product = CLIMATE_TEXT_PRODUCTS[productId]
	const climateBasePath = '/weather-data/text-hazards-outlooks/cpc-climate'

	const is6to14Outlook = productId === CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID
	const isMonthlyOutlook = productId === CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID

	// Page title
	const pageTitle = useMemo(() => {
		return product ? product.label : 'Climate Outlook'
	}, [product])

	// Create sorted options for the Select from available validtimes
	const validtimeOptions = useMemo(() => {
		if (!textData) return []

		const timestamps = Object.keys(textData)
		const sorted = timestamps.sort((a, b) => b.localeCompare(a))

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

		if (validTime === 'latest' && validtimeOptions.length > 0) {
			return validtimeOptions[0].value
		}

		if (!textData[validTime]) {
			return validtimeOptions[0]?.value || null
		}

		return validTime
	}, [textData, validTime, validtimeOptions])

	// Fetch text history (list of available validtimes)
	useEffect(() => {
		const fetchData = async () => {
			if (!product?.prodQueryString) return

			setIsLoadingData(true)
			try {
				const data = await getClimateTextHistory(product.prodQueryString)
				if (data) {
					setTextData(data)
				}
			} catch (error) {
				console.error('Failed to fetch climate product data:', error)
			} finally {
				setIsLoadingData(false)
			}
		}

		fetchData()
	}, [productId, product?.prodQueryString])

	// Fetch outlook graphics when validtime changes
	useEffect(() => {
		const fetchGraphics = async () => {
			if (!actualValidtimeId) {
				setOutlookGraphics(null)
				setIsLoadingGraphics(false)
				return
			}

			setIsLoadingGraphics(true)
			try {
				const data = await getClimateOutlookData(productId, actualValidtimeId)
				if (data) {
					setOutlookGraphics(data)
				}
			} catch (error) {
				console.error('Failed to fetch outlook graphics:', error)
			} finally {
				setIsLoadingGraphics(false)
			}
		}

		fetchGraphics()
	}, [productId, actualValidtimeId])

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
		const newPath = `${climateBasePath}/outlooks/${productId}/${newValidtimeId}`
		router.push(newPath)
	}

	// Render graphics grid based on product type
	const renderGraphics = () => {
		if (isLoadingGraphics) {
			return <div className={styles.loadingMessage}>Loading graphics...</div>
		}

		if (!outlookGraphics || !outlookGraphics.files) {
			return <div className={styles.noGraphics}>No graphics available</div>
		}

		const { temp, prcp } = outlookGraphics.files

		if (is6to14Outlook) {
			// 6-14 Day Outlook has 4 graphics: temp and prcp for both 6-10 and 8-14 periods
			// Arrays: [0] = 6-10 day, [1] = 8-14 day
			return (
				<div className={styles.graphicsGrid}>
					<div className={styles.graphicItem}>
						<h3>6-10 Day Temperature</h3>
						{temp?.[0] ? (
							<img src={temp[0]} alt="6-10 Day Temperature Outlook" />
						) : (
							<div className={styles.placeholder}>Not available</div>
						)}
					</div>
					<div className={styles.graphicItem}>
						<h3>6-10 Day Precipitation</h3>
						{prcp?.[0] ? (
							<img src={prcp[0]} alt="6-10 Day Precipitation Outlook" />
						) : (
							<div className={styles.placeholder}>Not available</div>
						)}
					</div>
					<div className={styles.graphicItem}>
						<h3>8-14 Day Temperature</h3>
						{temp?.[1] ? (
							<img src={temp[1]} alt="8-14 Day Temperature Outlook" />
						) : (
							<div className={styles.placeholder}>Not available</div>
						)}
					</div>
					<div className={styles.graphicItem}>
						<h3>8-14 Day Precipitation</h3>
						{prcp?.[1] ? (
							<img src={prcp[1]} alt="8-14 Day Precipitation Outlook" />
						) : (
							<div className={styles.placeholder}>Not available</div>
						)}
					</div>
				</div>
			)
		}

		if (isMonthlyOutlook) {
			// Monthly Outlook has 2 graphics: temp and prcp (first item in each array)
			return (
				<div className={styles.graphicsGridTwo}>
					<div className={styles.graphicItem}>
						<h3>Monthly Temperature Outlook</h3>
						{temp?.[0] ? (
							<img src={temp[0]} alt="Monthly Temperature Outlook" />
						) : (
							<div className={styles.placeholder}>Not available</div>
						)}
					</div>
					<div className={styles.graphicItem}>
						<h3>Monthly Precipitation Outlook</h3>
						{prcp?.[0] ? (
							<img src={prcp[0]} alt="Monthly Precipitation Outlook" />
						) : (
							<div className={styles.placeholder}>Not available</div>
						)}
					</div>
				</div>
			)
		}

		return null
	}

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.climateOutlooksPage}>
					<div className={styles.titleSection}>
						<span className={styles.category}>Climate Outlook</span>
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
			<div className={styles.climateOutlooksPage}>
				<div className={styles.titleSection}>
					<span className={styles.category}>Climate Outlook</span>
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

					<div className={styles.graphicsSection}>{renderGraphics()}</div>

					<div className={styles.textContent}>
						<h2>Discussion</h2>
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
