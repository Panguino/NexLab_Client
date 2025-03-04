'use client'

import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import { useRootStore } from '@/store/useRootStore'
import { useEffect, useRef } from 'react'
import styles from './SectorSelectorPanel.module.scss'

const SectorSelectorPanel = () => {
	const sectorSelectorRef = useRef(null)
	const sectorSelectorSectors = useRootStore.use.sectorSelectorSectors()
	const sectorSelectorD3config = useRootStore.use.sectorSelectorD3config()
	const sectorSelectorCurrentSector = useRootStore.use.sectorSelectorCurrentSector()
	const onSectorSelectorChange = useRootStore.use.onSectorSelectorChange()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()

	useEffect(() => {
		const handleClickOutsideSectorSelector = (event) => {
			if (sectorSelectorPanelIsOpen && sectorSelectorRef.current && !sectorSelectorRef.current.contains(event.target)) {
				closeSectorSelectorPanel()
			}
		}
		document.addEventListener('mousedown', handleClickOutsideSectorSelector)
		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSectorSelector)
		}
	}, [sectorSelectorPanelIsOpen, closeSectorSelectorPanel])

	return (
		<>
			{sectorSelectorPanelIsOpen && (
				<div ref={sectorSelectorRef} className={styles.sectorSelectorPanel}>
					<SectorSelector
						sectors={sectorSelectorSectors}
						d3config={sectorSelectorD3config}
						sector={sectorSelectorCurrentSector}
						onChange={onSectorSelectorChange}
					/>
				</div>
			)}
		</>
	)
}

export default SectorSelectorPanel
