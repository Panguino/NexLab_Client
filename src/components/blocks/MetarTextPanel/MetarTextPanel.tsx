import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useRootStore } from '@/store/useRootStore'
import styles from './MetarTextPanel.module.scss'

const MetarTextPanel: React.FC = () => {
	const metarContent = useRootStore.use.metarContent()
	const metarLoading = useRootStore.use.metarLoading()

	let content: React.ReactNode = null

	if (metarLoading) {
		content = <div className={styles.loadingIndicator}>Loading METAR data…</div>
	} else if (metarContent) {
		content = <pre className={styles.metarText}>{metarContent}</pre>
	} else {
		content = <div className={styles.placeholderMessage}>Select a METAR or Decoded Observations product to view data.</div>
	}

	return (
		<ScrollArea>
			<div className={styles.metarTextPanel}>{content}</div>
		</ScrollArea>
	)
}

export default MetarTextPanel
