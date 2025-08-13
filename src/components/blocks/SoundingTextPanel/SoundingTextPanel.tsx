import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useEffect, useState } from 'react'
import styles from './ProductInfoPanel.module.scss'

interface SoundingInfoPanelProps {
	url?: string
}

export const SoundingInfoPanel: React.FC<SoundingInfoPanelProps> = ({ url }) => {
	const [text, setText] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!url) return

		const fetchText = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await fetch(url)

				if (!response.ok) {
					throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
				}

				const content = await response.text()
				setText(content)
			} catch (err) {
				console.error('Error fetching sounding text:', err)
				setError(err instanceof Error ? err.message : 'Unknown error occurred')
				setText('')
			} finally {
				setLoading(false)
			}
		}

		fetchText()
	}, [url])

	return (
		<ScrollArea>
			<div className={styles.soundingTextPanel}>
				{loading && <div className={styles.loadingIndicator}>Loading...</div>}
				{error && <div className={styles.errorMessage}>Error: {error}</div>}
				{!loading && !error && text && <pre className={styles.soundingText}>{text}</pre>}
				{!loading && !error && !text && !url && <div className={styles.placeholderMessage}>No sounding text selected</div>}
			</div>
		</ScrollArea>
	)
}

export default SoundingInfoPanel
