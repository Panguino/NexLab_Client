import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { useRootStore } from '@/store/useRootStore'
import styles from './TropicalTextPanel.module.scss'

export const TropicalTextPanel: React.FC = () => {
	const tropicalTextContent = useRootStore.use.tropicalTextContent()

	let content: React.ReactNode = null
	if (tropicalTextContent) {
		content = <pre className={styles.tropicalText}>{tropicalTextContent}</pre>
	} else {
		content = <div className={styles.placeholderMessage}>No tropical product selected</div>
	}

	return (
		<ScrollArea>
			<div className={styles.tropicalTextPanel}>{content}</div>
		</ScrollArea>
	)
}

export default TropicalTextPanel
