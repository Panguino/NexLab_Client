import styles from './SidebarPanelPad.module.scss'

interface SidebarPanelPadProps {
	children: React.ReactNode
}

const SidebarPanelPad = ({ children }: SidebarPanelPadProps) => {
	return <div className={styles.SidebarPanelPad}>{children}</div>
}

export default SidebarPanelPad
