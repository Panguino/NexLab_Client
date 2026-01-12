'use client'

import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getMesoscaleDiscussion } from '@/util/dataCalls/text/query-convective'
import { useEffect, useState } from 'react'
import styles from './MesoscaleDiscussionDetailPage.module.scss'

interface MesoscaleDiscussionData {
	graphic: string
	text: string
}

interface MesoscaleDiscussionDetailPageProps {
	mdId: string
}

export const MesoscaleDiscussionDetailPage = ({ mdId }: MesoscaleDiscussionDetailPageProps) => {
	const [mdData, setMdData] = useState<MesoscaleDiscussionData | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [displayText, setDisplayText] = useState<string | null>(null)
	const [isLoadingText, setIsLoadingText] = useState(true)

	// Parse mdId to extract type and number (format: "MCD_1234" or "MPD_5678")
	const [mdType, mdNumber] = mdId.split('_')

	const getTypeLabel = () => {
		if (mdType === 'MCD') return 'Mesoscale Convective Discussion'
		if (mdType === 'MPD') return 'Mesoscale Precipitation Discussion'
		return 'Mesoscale Discussion'
	}

	const getTypeClass = () => {
		if (mdType === 'MCD') return styles.mcd
		if (mdType === 'MPD') return styles.mpd
		return styles.default
	}

	const pageTitle = `${getTypeLabel()} #${mdNumber}`

	// Fetch mesoscale discussion data
	useEffect(() => {
		const fetchMdData = async () => {
			try {
				const data = await getMesoscaleDiscussion(mdId)
				if (data) {
					setMdData(data)
				}
			} catch (error) {
				console.error('Failed to fetch mesoscale discussion:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchMdData()
	}, [mdId])

	// Fetch the text content when mdData is available
	useEffect(() => {
		const fetchTextContent = async () => {
			if (!mdData?.text) {
				setDisplayText(null)
				setIsLoadingText(false)
				return
			}

			setIsLoadingText(true)
			try {
				const response = await fetch(mdData.text)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const htmlText = await response.text()

				// Extract text from <pre> tag
				const parser = new DOMParser()
				const doc = parser.parseFromString(htmlText, 'text/html')
				const preElement = doc.querySelector('pre')
				const productText = preElement?.textContent || ''

				setDisplayText(productText)
			} catch (error) {
				console.error('Error fetching mesoscale discussion text:', error)
				setDisplayText('Error loading discussion')
			} finally {
				setIsLoadingText(false)
			}
		}

		fetchTextContent()
	}, [mdData])

	if (isLoading) {
		return (
			<ScrollArea>
				<div className={styles.mesoscaleDiscussionDetailPage}>
					<div className={`${styles.titleSection} ${getTypeClass()}`}>
						<h1>Loading mesoscale discussion...</h1>
					</div>
				</div>
			</ScrollArea>
		)
	}

	if (!mdData) {
		return (
			<ScrollArea>
				<div className={styles.mesoscaleDiscussionDetailPage}>
					<div className={`${styles.titleSection} ${getTypeClass()}`}>
						<h1>Mesoscale Discussion Not Found</h1>
					</div>
				</div>
				<Footer />
			</ScrollArea>
		)
	}

	return (
		<ScrollArea>
			<div className={styles.mesoscaleDiscussionDetailPage}>
				<div className={`${styles.titleSection} ${getTypeClass()}`}>
					<h1>{pageTitle}</h1>
				</div>

				<div className={styles.contentSection}>
					<div className={styles.graphicsPanel}>
						<div className={styles.graphicContainer}>
							<img src={mdData.graphic} alt={`Mesoscale Discussion ${mdId}`} className={styles.graphic} />
						</div>
					</div>

					<div className={styles.textPanel}>
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
