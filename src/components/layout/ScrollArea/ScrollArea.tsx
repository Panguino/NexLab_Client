import * as ReactScrollArea from '@radix-ui/react-scroll-area'
import styles from './ScrollArea.module.scss'

interface ScrollAreaProps {
	children: React.ReactNode
	removeDisplayTable?: boolean
}

const ScrollArea = ({ children, removeDisplayTable = false }: ScrollAreaProps) => (
	<ReactScrollArea.Root className={styles.ScrollAreaRoot}>
		<ReactScrollArea.Viewport className={`${styles.ScrollAreaViewport} ${removeDisplayTable ? styles.removeTable : ''}`}>
			{children}
		</ReactScrollArea.Viewport>
		<ReactScrollArea.Scrollbar className={styles.ScrollAreaScrollbar} orientation="vertical">
			<ReactScrollArea.Thumb className={styles.ScrollAreaThumb} />
		</ReactScrollArea.Scrollbar>
		<ReactScrollArea.Corner className={styles.ScrollAreaCorner} />
	</ReactScrollArea.Root>
)
export default ScrollArea
