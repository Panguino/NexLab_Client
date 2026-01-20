'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import { Animator } from '@/components/elements/Animator/Animator'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID, CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID, CLIMATE_TEXT_PRODUCTS } from '@/data/text/climate/products'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getClimateOutlookData, getClimateTextHistory } from '@/util/dataCalls/text/query-climate'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const router = useRouter()

	// Store state for animator
	const climateOutlooksFrameRate = useRootStore.use.climateOutlooksFrameRate()
	const climateOutlooksLastFrameDwell = useRootStore.use.climateOutlooksLastFrameDwell()
	const climateOutlooksLastFrameDwellTime = useRootStore.use.climateOutlooksLastFrameDwellTime()
	const climateOutlooksZoomState = useRootStore.use.climateOutlooksZoomState()
	const setClimateOutlooksZoomState = useRootStore.use.setClimateOutlooksZoomState()
	const climateOutlooksZoomFill = useRootStore.use.climateOutlooksZoomFill()
	const setClimateOutlooksZoomFill = useRootStore.use.setClimateOutlooksZoomFill()

	// Local state
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)
	const [isLoadingFrames, setIsLoadingFrames] = useState(true)

	// Animator state
	const [imageInfo, setImageInfo] = useState({ width: 800, height: 600 })
	const [frames, setFrames] = useState<string[]>([])
	const [startFrame, setStartFrame] = useState(0)

	const product = CLIMATE_TEXT_PRODUCTS[productId]
	const climateBasePath = '/weather-data/text-hazards-outlooks/cpc-climate'

	const is6to14Outlook = productId === CLIMATE_TEXT_PRODUCT_6_14_OUTLOOK_ID
	const isMonthlyOutlook = productId === CLIMATE_TEXT_PRODUCT_MONTHLY_OUTLOOK_ID

	// Frame labels based on product type
	const frameLabels = useMemo(() => {
		if (is6to14Outlook) {
			return ['6-10 Day Temperature', '6-10 Day Precipitation', '8-14 Day Temperature', '8-14 Day Precipitation']
		}
		if (isMonthlyOutlook) {
			return ['Monthly Temperature', 'Monthly Precipitation']
		}
		return []
	}, [is6to14Outlook, isMonthlyOutlook])

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

	// Fetch outlook graphics frames when validtime changes
	const getData = useCallback(async () => {
		if (!actualValidtimeId) {
			setFrames([])
			setIsLoadingFrames(false)
			return
		}

		setIsLoadingFrames(true)
		try {
			const data = await getClimateOutlookData(productId, actualValidtimeId)
			if (data && !data.error && data.files) {
				const outlookData = data as OutlookGraphicsResponse
				const { temp, prcp } = outlookData.files || {}

				// Build frames array based on product type
				const framesList: string[] = []
				if (is6to14Outlook) {
					// 6-14 Day: temp[0], prcp[0], temp[1], prcp[1]
					if (temp?.[0]) framesList.push(temp[0])
					if (prcp?.[0]) framesList.push(prcp[0])
					if (temp?.[1]) framesList.push(temp[1])
					if (prcp?.[1]) framesList.push(prcp[1])
				} else if (isMonthlyOutlook) {
					// Monthly: temp[0], prcp[0]
					if (temp?.[0]) framesList.push(temp[0])
					if (prcp?.[0]) framesList.push(prcp[0])
				}

				setFrames(framesList)
				setStartFrame(0)
				if (outlookData.img) {
					setImageInfo(outlookData.img)
				}
			}
		} catch (error) {
			console.error('Failed to fetch outlook graphics:', error)
		} finally {
			setIsLoadingFrames(false)
		}
	}, [productId, actualValidtimeId, is6to14Outlook, isMonthlyOutlook])

	useEffect(() => {
		getData()
	}, [getData])

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

					<div className={styles.animatorSection}>
						{isLoadingFrames ? (
							<div className={styles.loadingMessage}>Loading frames...</div>
						) : frames.length > 0 ? (
							<div className={styles.animatorWrapper}>
								<Animator
									frames={frames}
									frameLabels={frameLabels}
									startFrame={startFrame}
									imageInfo={imageInfo}
									initialZoomState={climateOutlooksZoomState}
									setZoomState={setClimateOutlooksZoomState}
									zoomFill={climateOutlooksZoomFill}
									setZoomFill={setClimateOutlooksZoomFill}
									fullScreen={false}
									setFullScreen={() => {}}
									disableZoom={true}
									interval={1000 / climateOutlooksFrameRate}
									lastFrameDwell={climateOutlooksLastFrameDwell}
									lastFrameDwellTime={climateOutlooksLastFrameDwellTime * 1000}
								/>
							</div>
						) : (
							<div className={styles.noFrames}>No frames available for this outlook</div>
						)}
					</div>

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
