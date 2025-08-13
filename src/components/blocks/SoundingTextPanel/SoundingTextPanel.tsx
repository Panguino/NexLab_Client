import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useRootStore } from '@/store/useRootStore'
import { useEffect, useState } from 'react'
import styles from './SoundingTextPanel.module.scss'

export const SoundingTextPanel: React.FC = () => {
	const [text, setText] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const soundingTextURL = useRootStore.use.soundingTextURL()

	useEffect(() => {
		if (!soundingTextURL) return

		const fetchText = async () => {
			try {
				setLoading(true)
				setError(null)

				const response = await fetch(soundingTextURL)

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
	}, [soundingTextURL])

	// Clean conditional rendering for clarity
	let content: React.ReactNode = null
	if (loading) {
		content = <div className={styles.loadingIndicator}>Loading...</div>
	} else if (error) {
		content = <div className={styles.errorMessage}>Error: {error}</div>
	} else if (text) {
		content = <pre className={styles.soundingText}>{text}</pre>
	} else if (!soundingTextURL) {
		content = <div className={styles.placeholderMessage}>No sounding text selected</div>
	}

	return (
		<ScrollArea>
			<div className={styles.soundingTextPanel}>{content}</div>
		</ScrollArea>
	)
}

export default SoundingTextPanel
