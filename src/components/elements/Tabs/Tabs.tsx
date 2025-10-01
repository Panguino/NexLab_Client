'use client'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode } from 'react'
import styles from './Tabs.module.scss'

interface TabProps {
	label?: ReactNode
	icon?: ReactNode
	children: ReactNode
}

interface TabsProps {
	children: React.ReactElement<TabProps>[]
	activeTab: number
	setActiveTab: (index: number) => void
}

export const Tab: React.FC<TabProps> = ({ children }) => {
	return <>{children}</>
}

export const Tabs: React.FC<TabsProps> = ({ children, activeTab, setActiveTab }) => {
	return (
		<div className={styles.tabs}>
			<div className={styles.tabLabels}>
				{React.Children.map(children, (child, index) => (
					<div key={index} className={index === activeTab ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveTab(index)}>
						{child.props.icon || ''} {child.props.label || ''}
						{index === activeTab && (
							<div
								className={styles.closeTab}
								onClick={(e) => {
									e.stopPropagation()
									setActiveTab(-1)
								}}
							>
								<FontAwesomeIcon icon={faClose} />
							</div>
						)}
					</div>
				))}
			</div>
			{activeTab !== -1 && (
				<div className={styles.tabContent}>{React.Children.map(children, (child, index) => (index === activeTab ? child : null))}</div>
			)}
		</div>
	)
}
