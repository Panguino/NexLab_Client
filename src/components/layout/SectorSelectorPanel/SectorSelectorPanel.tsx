'use client'

import SectorSelector from '@/components/elements/SectorSelector/SectorSelector'
import useDimensions from '@/hooks/useDimensions'
import { useRootStore } from '@/store/useRootStore'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import styles from './SectorSelectorPanel.module.scss'

const SectorSelectorPanel = () => {
	const sectorSelectorRef = useRef(null)
	const sectorSelectorSectors = useRootStore.use.sectorSelectorSectors()
	const sectorSelectorD3config = useRootStore.use.sectorSelectorD3config()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const onChangeSectorSelectorSectorHandler = useRootStore.use.onChangeSectorSelectorSectorHandler()
	const [wrapperRef, { width, height, adjustedHeight, adjustedWidth }, updateDimensions] = useDimensions(10 / 7, false)

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
	}, [sectorSelectorPanelIsOpen, closeSectorSelectorPanel, sectorSelectorRef])

	useEffect(() => {
		const handleResize = () => {
			updateDimensions()
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [updateDimensions])

	useLayoutEffect(() => {
		updateDimensions()
	}, [updateDimensions, sectorSelectorPanelIsOpen])

	return (
		<>
			{sectorSelectorPanelIsOpen && (
				<div ref={sectorSelectorRef} className={styles.sectorSelectorPanel}>
					<div ref={wrapperRef} className={styles.sectorSelectorPanelWrapper}>
						<div className={styles.closeButton} onClick={closeSectorSelectorPanel}>
							<FontAwesomeIcon icon={faClose} />
						</div>
						<TransformWrapper disablePadding doubleClick={{ disabled: true }} panning={{ velocityDisabled: true }} centerOnInit>
							{() => (
								<TransformComponent
									wrapperStyle={{
										width: width,
										height: height,
									}}
									contentStyle={{ width: adjustedWidth, height: adjustedHeight }}
								>
									<SectorSelector
										sectors={sectorSelectorSectors}
										d3config={sectorSelectorD3config}
										onChange={onChangeSectorSelectorSectorHandler}
									/>
								</TransformComponent>
							)}
						</TransformWrapper>
					</div>
				</div>
			)}
		</>
	)
}

export default SectorSelectorPanel
