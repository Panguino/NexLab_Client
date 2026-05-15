'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import { Animator } from '@/components/elements/Animator/Animator'
import AnimatorSettings from '@/components/elements/AnimatorSettings/AnimatorSettings'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { CLIMATE_TEXT_PRODUCTS } from '@/data/text/climate/products'
import { useZoomFillHydration } from '@/hooks/useZoomFillHydration'
import { useRootStore } from '@/store/useRootStore'
import { getClimateTextHistory, getSeasonalOutlookData } from '@/util/dataCalls/text/query-climate'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ClimateSeasonalAnimatorSettings from '../_animatorSettingPanels/ClimateSeasonalAnimatorSettings/ClimateSeasonalAnimatorSettings'
import styles from './ClimateSeasonalPage.module.scss'

interface ClimateSeasonalPageProps {
	productId: string
	validTime: string
}

export const ClimateSeasonalPage = ({ productId, validTime }: ClimateSeasonalPageProps) => {
	// Initialize zoom fill from localStorage on client side
	useZoomFillHydration()

	const router = useRouter()

	// Store state for animator
	const climateSeasonalFrameRate = useRootStore.use.climateSeasonalFrameRate()
	const setClimateSeasonalFrameRate = useRootStore.use.setClimateSeasonalFrameRate()
	const climateSeasonalLastFrameDwell = useRootStore.use.climateSeasonalLastFrameDwell()
	const climateSeasonalLastFrameDwellTime = useRootStore.use.climateSeasonalLastFrameDwellTime()
	const setClimateSeasonalLastFrameDwellTime = useRootStore.use.setClimateSeasonalLastFrameDwellTime()
	const climateSeasonalZoomState = useRootStore.use.climateSeasonalZoomState()
	const setClimateSeasonalZoomState = useRootStore.use.setClimateSeasonalZoomState()
	const climateSeasonalZoomFill = useRootStore.use.climateSeasonalZoomFill()
	const setClimateSeasonalZoomFill = useRootStore.use.setClimateSeasonalZoomFill()

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
	const [frameValidTimes, setFrameValidTimes] = useState<number[]>([])

	const product = CLIMATE_TEXT_PRODUCTS[productId]
	const climateBasePath = '/weather-data/text-hazards-outlooks/cpc-climate'

	// Page title
	const pageTitle = useMemo(() => {
		return product ? product.label : 'Seasonal Outlook'
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

	// Fetch seasonal frames when validtime changes
	const getData = useCallback(async () => {
		if (!actualValidtimeId) {
			setFrames([])
			setIsLoadingFrames(false)
			return
		}

		setIsLoadingFrames(true)
		try {
			const data = await getSeasonalOutlookData(productId, actualValidtimeId)
			if (data && !data.error && data.files) {
				setFrames(data.files)
				setFrameValidTimes(data.validtimes || [])
				setStartFrame(0)
				if (data.img) {
					setImageInfo(data.img)
				}
			}
		} catch (error) {
			console.error('Failed to fetch seasonal frames:', error)
		} finally {
			setIsLoadingFrames(false)
		}
	}, [productId, actualValidtimeId])

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
		const newPath = `${climateBasePath}/seasonal/${productId}/${newValidtimeId}`
		router.push(newPath)
	}

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.climateSeasonalPage}>
					<div className={styles.titleSection}>
						<span className={styles.category}>Seasonal Outlook</span>
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
			<div className={styles.climateSeasonalPage}>
				<div className={styles.titleSection}>
					<span className={styles.category}>Seasonal Outlook</span>
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
									frameValidTimes={frameValidTimes}
									startFrame={startFrame}
									imageInfo={imageInfo}
									initialZoomState={climateSeasonalZoomState}
									setZoomState={setClimateSeasonalZoomState}
									zoomFill={climateSeasonalZoomFill}
									setZoomFill={setClimateSeasonalZoomFill}
									fullScreen={false}
									setFullScreen={() => {}}
									disableZoom={true}
									playbackFps={climateSeasonalFrameRate}
									setPlaybackFps={setClimateSeasonalFrameRate}
									playbackFpsMax={20}
									interval={1000 / climateSeasonalFrameRate}
									lastFrameDwell={climateSeasonalLastFrameDwell}
									edgeDwellSeconds={climateSeasonalLastFrameDwellTime}
									setEdgeDwellSeconds={setClimateSeasonalLastFrameDwellTime}
									lastFrameDwellTime={climateSeasonalLastFrameDwellTime * 1000}
									settingsComponent={
										<AnimatorSettings title="Seasonal Outlook Settings">
											<ClimateSeasonalAnimatorSettings refreshData={getData} />
										</AnimatorSettings>
									}
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
