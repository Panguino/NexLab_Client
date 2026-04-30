'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import Toggle from '@/components/elements/Toggle/Toggle'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { PRODUCT_INFO_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styles from './TrackerSidebarPanel.module.scss'

const TrackerSidebarPanel = () => {
	const trackerLayers = useRootStore.use.trackerLayers()
	const toggleTrackerLayer = useRootStore.use.toggleTrackerLayer()
	const setProductInfoId = useRootStore.use.setProductInfoId()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	const [expandedInfo, setExpandedInfo] = useState<string | null>(null)

	const handleInfoClick = (layerId: string, strapiProductId?: string) => {
		if (strapiProductId) {
			setProductInfoId(strapiProductId)
			openSlideoutPanel(PRODUCT_INFO_SLIDEOUT)
		} else {
			setExpandedInfo(expandedInfo === layerId ? null : layerId)
		}
	}

	return (
		<ScrollArea>
			<div className={styles.TrackerSidebarPanel}>
				<SidebarGroup title="Map Layers">
					{trackerLayers.map((layer) => (
						<div key={layer.id} className={styles.layerItem}>
							<div className={styles.layerRow}>
								<Toggle value={layer.active} onClick={() => toggleTrackerLayer(layer.id)} />
								<span className={`${styles.layerLabel} ${layer.active ? styles.layerLabelActive : ''}`}>{layer.label}</span>
								{layer.description && (
									<button
										className={styles.infoBtn}
										onClick={() => handleInfoClick(layer.id, layer.strapiProductId)}
										aria-label={`Info about ${layer.label}`}
									>
										<FontAwesomeIcon icon={faCircleInfo} />
									</button>
								)}
							</div>
							{layer.description && expandedInfo === layer.id && !layer.strapiProductId && (
								<div className={styles.layerDescription}>{layer.description}</div>
							)}
						</div>
					))}
				</SidebarGroup>
			</div>
		</ScrollArea>
	)
}

export default TrackerSidebarPanel
