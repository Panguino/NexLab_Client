'use client'
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
 */
export const MapLayerPanel = ({ open, onClose, layerVisibility, setLayerVisibility, dataType }: IMapLayerPanelProps) => {
	const [groupOpen, setGroupOpen] = useState<Record<string, boolean>>({
		general: true,
		data: true,
	})

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

	const toggleGroup = (group: 'general' | 'data') => {
		setGroupOpen({
			...groupOpen,
			[group]: !groupOpen[group],
		})
	}

	// Get layers available for current data type
	const availableLayers = getLayersForDataType(dataType)
	const generalLayers = availableLayers.filter((l) => l.category === 'general')
	const dataLayers = availableLayers.filter((l) => l.category === 'data')

	const renderLayerGroup = (layers: MapLayer[], groupKey: 'general' | 'data') => {
		return (
			<div key={groupKey} className={styles.layerGroup}>
				{layers.map((layer) => (
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
				))}
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
				{generalLayers.length > 0 && renderLayerGroup(generalLayers, 'general')}
				{dataLayers.length > 0 && renderLayerGroup(dataLayers, 'data')}
			</div>

			{availableLayers.length === 0 && <div className={styles.noLayers}>No layers available for this data type</div>}
		</div>
	)
}
