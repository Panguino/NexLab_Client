import React, { ReactNode, useState } from 'react'

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
		<div>
			<div className="tab-labels">
				{React.Children.map(children, (child, index) => (
					<button key={index} className={index === activeTab ? 'active' : ''} onClick={() => setActiveTab(index)}>
						{child.props.label}
					</button>
				))}
			</div>
			<div className="tab-content">{React.Children.map(children, (child, index) => (index === activeTab ? child : null))}</div>
		</div>
	)
}
