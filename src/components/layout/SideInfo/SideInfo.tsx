import ScrollArea from '../ScrollArea/ScrollArea'
import styles from './SideInfo.module.scss'

interface SideInfoProps {
	children: React.ReactNode
}

const SideInfo = ({ children }: SideInfoProps) => {
	return (
		<div className={styles.SideInfo}>
			<ScrollArea>
				<div className={styles.sideInfoContent}>{children}</div>
			</ScrollArea>
		</div>
	)
}

export default SideInfo
