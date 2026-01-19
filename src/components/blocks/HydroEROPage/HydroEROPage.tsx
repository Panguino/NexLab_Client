'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import Select from '@/components/elements/Select/Select'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getERODiscussions, getEROGraphics } from '@/util/dataCalls/text/query-hydrological'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './HydroEROPage.module.scss'

interface HydroEROPageProps {
	validTime: string
}

interface EROGraphicsResponse {
	error?: boolean
	files?: {
		eroday1?: string
		eroday2?: string
		eroday3?: string
	}
	img?: {
		width: number
		height: number
	}
}

export const HydroEROPage = ({ validTime }: HydroEROPageProps) => {
	const router = useRouter()
	const [textData, setTextData] = useState<Record<string, string> | null>(null)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [eroGraphics, setEROGraphics] = useState<EROGraphicsResponse | null>(null)
	const [isLoadingData, setIsLoadingData] = useState(true)
	const [isLoadingText, setIsLoadingText] = useState(true)
	const [isLoadingGraphics, setIsLoadingGraphics] = useState(true)

	const hydroBasePath = '/weather-data/text-hazards-outlooks/nws-rfc-hydrological'

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

	// Fetch ERO discussion text data
	useEffect(() => {
		const fetchData = async () => {
			setIsLoadingData(true)
			try {
				const data = await getERODiscussions()
				if (data) {
					setTextData(data)
				}
			} catch (error) {
				console.error('Failed to fetch ERO discussion data:', error)
			} finally {
				setIsLoadingData(false)
			}
		}

		fetchData()
	}, [])

	// Fetch ERO graphics when validtime changes
	useEffect(() => {
		const fetchGraphics = async () => {
			if (!actualValidtimeId) {
				setEROGraphics(null)
				setIsLoadingGraphics(false)
				return
			}

			setIsLoadingGraphics(true)
			try {
				const data = await getEROGraphics(actualValidtimeId)
				if (data) {
					setEROGraphics(data as EROGraphicsResponse)
				}
			} catch (error) {
				console.error('Failed to fetch ERO graphics:', error)
			} finally {
				setIsLoadingGraphics(false)
			}
		}

		fetchGraphics()
	}, [actualValidtimeId])

	// Fetch text content when validtime changes
	useEffect(() => {
		const fetchTextContent = async () => {
			if (!actualValidtimeId || !textData) {
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
	}, [actualValidtimeId, textData])

	// Handle validtime selection change
	const handleValidtimeChange = (newValidtime: string) => {
		router.push(`${hydroBasePath}/ero/${newValidtime}`)
	}

	// Graphics for each day
	const eroGraphicsList = [
		{ key: 'eroday1', label: 'Day 1' },
		{ key: 'eroday2', label: 'Day 2' },
		{ key: 'eroday3', label: 'Day 3' },
	]

	if (isLoadingData) {
		return (
			<ScrollArea>
				<div className={styles.hydroEROPage}>
					<div className={styles.titleSection}>
						<span className={styles.category}>Excessive Rainfall Outlook</span>
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
			<div className={styles.hydroEROPage}>
				<div className={styles.titleSection}>
					<span className={styles.category}>Excessive Rainfall Outlook</span>
					<h1>ERO Discussion</h1>
					<p className={styles.subtitle}>
						The ERO identifies areas with elevated risk of rainfall exceeding flash flood guidance over the next 3 days.
					</p>
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

					<div className={styles.graphicsGrid}>
						{eroGraphicsList.map(({ key, label }) => {
							const graphicUrl = eroGraphics?.files?.[key as keyof EROGraphicsResponse['files']] || ''
							return (
								<div key={key} className={styles.graphicCard}>
									<h3>{label}</h3>
									{isLoadingGraphics ? (
										<div className={styles.graphicLoading}>Loading...</div>
									) : graphicUrl ? (
										<img src={graphicUrl} alt={`ERO ${label}`} className={styles.graphic} />
									) : (
										<div className={styles.noGraphic}>No graphic available</div>
									)}
								</div>
							)
						})}
					</div>

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
