import React from 'react'
import styles from './SidebarWrapper.module.scss'

interface SidebarWrapperProps {
	children: React.ReactNode
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
	return <div className={styles.SidebarWrapper}>{children}</div>
}

export default SidebarWrapper
