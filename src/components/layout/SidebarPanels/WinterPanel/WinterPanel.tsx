'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import styles from './WinterPanel.module.scss'

interface WinterPanelProps {
	basepath: string
}

const WinterPanel = ({ basepath }: WinterPanelProps) => {
	return (
		<>
			<SidebarSectionHeader name="Winter" linkUrl={basepath} />
			<div className={styles.panelContainer}>
				<SidebarGroup title="Active Hazards">
					<></>
				</SidebarGroup>

				<SidebarGroup title="Reported Values">
					<></>
				</SidebarGroup>

				<SidebarGroup title="Outlooks">
					<></>
				</SidebarGroup>
			</div>
		</>
	)
}

export default WinterPanel
