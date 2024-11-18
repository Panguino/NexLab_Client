import styles from './SideInfo.module.scss'

interface SideInfoProps {
	children: React.ReactNode
}

const SideInfo = ({ children }: SideInfoProps) => {
	return <div className={styles.SideInfo}>{children}</div>
}

export default SideInfo
