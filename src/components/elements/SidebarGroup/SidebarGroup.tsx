import styles from './SidebarGroup.module.scss'
interface ISidebarGroupProps {
	title: string
	children: React.ReactNode
	extraInfo?: string
	styleType?: 'default' | 'dot'
}

export const SidebarGroup = ({ title, extraInfo, children, styleType = 'default' }: ISidebarGroupProps) => {
	return (
		<div className={`${styles.SidebarGroup} ${styleType === 'dot' ? styles.withDot : ''}`}>
			<div className={styles.title}>
				{title} {extraInfo && <span>{extraInfo}</span>}
			</div>
			{children}
		</div>
	)
}
