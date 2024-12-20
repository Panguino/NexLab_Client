import React, { ReactNode, useState } from 'react'
import styles from './Tabs.module.scss'

interface TabProps {
	label: ReactNode
	children: ReactNode
}

interface TabsProps {
	children: React.ReactElement<TabProps>[]
}

export const Tab: React.FC<TabProps> = ({ children }) => {
	return <>{children}</>
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<div className={styles.tabs}>
			<div className={styles.tabLabels}>
				{React.Children.map(children, (child, index) => (
					<div key={index} className={index === activeTab ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab(index)}>
						{child.props.label}
					</div>
				))}
			</div>
			<div className={styles.tabContent}>{React.Children.map(children, (child, index) => (index === activeTab ? child : null))}</div>
		</div>
	)
}
