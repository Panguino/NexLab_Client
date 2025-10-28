'use client'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { DataType, getLayersForDataType, MapLayer } from '../AnimatorMapMachine/config/mapLayers'
import styles from './MapLayerPanel.module.scss'

interface IMapLayerPanelProps {
	open: boolean
	onClose: () => void
	layerVisibility: Record<string, boolean>
	setLayerVisibility: (visibility: Record<string, boolean>) => void
	dataType: DataType
}

/**
 * MapLayerPanel Component
 *
 * Provides layer visibility controls for map animator
 * Shows/hides layers based on the current data type being viewed
 * Organized into collapsible overlay groups matching the satellite/radar animator style
 */
export const MapLayerPanel = ({ open, onClose, layerVisibility, setLayerVisibility, dataType }: IMapLayerPanelProps) => {
	const [groupOpen, setGroupOpen] = useState('general')

	// Close panel when clicking outside
	useEffect(() => {
		if (!open) {
			return () => {}
		}

		const handleClickOutside = (event: MouseEvent) => {
			if ((event.target as HTMLElement).closest(`.${styles.MapLayerPanel}`) === null) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open, onClose])

	const handleLayerToggle = (layerId: string) => {
		setLayerVisibility({
			...layerVisibility,
			[layerId]: !layerVisibility[layerId],
		})
	}

	// Get layers available for current data type
	const availableLayers = getLayersForDataType(dataType)
	const generalLayers = availableLayers.filter((l) => l.category === 'general')
	const dataLayers = availableLayers.filter((l) => l.category === 'data')

	const renderLayerItem = (layer: MapLayer) => (
		<div
			key={layer.id}
			className={`${styles.layerItem} ${layerVisibility[layer.id] ? styles.active : ''}`}
			onClick={() => handleLayerToggle(layer.id)}
			title={layer.description}
		>
			<div className={styles.layerCheckbox}>
				<input
					type="checkbox"
					checked={layerVisibility[layer.id] || false}
					onChange={() => handleLayerToggle(layer.id)}
					onClick={(e) => e.stopPropagation()}
				/>
			</div>
			<div className={styles.layerInfo}>
				<div className={styles.layerName}>{layer.name}</div>
				{layer.description && <div className={styles.layerDescription}>{layer.description}</div>}
			</div>
		</div>
	)

	const renderOverlayGroup = (title: string, layers: MapLayer[], groupKey: 'general' | 'data') => {
		const isOpen = groupOpen === groupKey

		return (
			<div key={groupKey} className={styles.overlayGroup}>
				<div className={styles.overlayGroupTitle} onClick={() => setGroupOpen(groupKey)}>
					{title}
					<motion.div animate={{ transform: `${isOpen ? 'rotate(0deg)' : 'rotate(180deg)'}` }}>
						<FontAwesomeIcon icon={faChevronDown} />
					</motion.div>
				</div>
				<motion.div animate={{ height: isOpen ? 'auto' : 0 }} className={styles.layerItems}>
					{layers.map(renderLayerItem)}
				</motion.div>
			</div>
		)
	}

	return (
		<div
			className={styles.MapLayerPanel}
			style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none' }}
			onClick={(e) => e.stopPropagation()}
			onMouseDown={(e) => e.stopPropagation()}
		>
			<div className={styles.layerGroups}>
				{generalLayers.length > 0 && renderOverlayGroup('Static Map', generalLayers, 'general')}
				{dataLayers.length > 0 && renderOverlayGroup('Data Layers', dataLayers, 'data')}
			</div>

			{availableLayers.length === 0 && <div className={styles.noLayers}>No layers available for this data type</div>}
		</div>
	)
}
