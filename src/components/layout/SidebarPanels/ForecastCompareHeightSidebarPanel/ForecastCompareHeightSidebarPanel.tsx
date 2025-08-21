'use client'

import { Button } from '@/components/elements/Button/Button'
import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_REGIONS } from '@/data/forecast/regions'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { useRootStore } from '@/store/useRootStore'
import { buildProductsByLevel, fetchFloaterSectorData } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastCompareHeightSidebarPanel.module.scss'

const ForecastCompareHeightSidebarPanel = () => {
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstCompareValid: validTimeId,
	} = useParams()
	const router = useRouter()

	// root-store hooks used for opening sector picker and wiring the selector panel
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()

	// keep product entries grouped by level and update whenever model or internal sector change
	const [sortedProductEntries, setSortedProductEntries] = useState<Array<{ level: string; products: string[] }>>([])

	// models to omit from the Model Select
	const OMIT_MODELS = ['HRRR', 'NAMNST', 'CFS', 'SREF', 'GEFS']
	const allowedModelKeys = Object.keys(FORECAST_MODELS).filter((m) => !OMIT_MODELS.includes(m))

	// internal model id (user can change model in this panel without immediately routing)
	const [internalModelId, setInternalModelId] = useState<string>(() =>
		allowedModelKeys.includes(modelId as string) ? (modelId as string) : allowedModelKeys[0] ?? (modelId as string),
	)

	// region/sector state (used by the sector selector)
	const regionInitial = (FORECAST_SECTORS as any)[sectorId as string]?.region || ''
	const [regionId, setRegionId] = useState<string>(regionInitial)

	// internal sector id (user picks a sector in this panel; we don't immediately route)
	const [internalSectorId, setInternalSectorId] = useState<string>(sectorId as string)

	useEffect(() => {
		const entries = buildProductsByLevel((internalModelId as string) || '', (internalSectorId as string) || '')
		setSortedProductEntries(entries)
	}, [internalModelId, internalSectorId])

	// when the sector selector slideout opens, populate it with sectors and floater data
	useEffect(() => {
		if (sectorSelectorPanelIsOpen) {
			const loadSectorData = async () => {
				const region = (FORECAST_REGIONS as any)[regionId as string]
				const newD3config = {
					rotate: region?.rotate,
					scale: region?.scale,
				}
				setSectorSelectorD3config(newD3config)
				const updatedSectorData = await fetchFloaterSectorData()
				const modelKey = (FORECAST_MODELS as any)[internalModelId as string] ? (internalModelId as string) : DEFAULT_FORECAST_MODEL
				const selectedSectors = (FORECAST_MODELS as any)[modelKey].sectors
					.filter((sId: string) => (FORECAST_SECTORS as any)[sId].region === regionId)
					.map((sId: string) => {
						if (updatedSectorData && updatedSectorData[sId] && updatedSectorData[sId].coordinates) {
							return {
								id: sId,
								...(FORECAST_SECTORS as any)[sId],
								coordinates: updatedSectorData[sId].coordinates,
							}
						}
						return {
							id: sId,
							...(FORECAST_SECTORS as any)[sId],
						}
					})
				setSectorSelectorSectors(selectedSectors)
			}
			loadSectorData()
		}
	}, [sectorSelectorPanelIsOpen, internalModelId, regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	// wire up handler so when a sector is picked in the selector, we close the panel and navigate
	useEffect(() => {
		// when the user selects a sector in the selector, update internal sector id and close the panel
		updateOnChangeSectorSelectorSectorHandler((newSectorId: string) => {
			setInternalSectorId(newSectorId)
			// update region to keep selector in sync
			setRegionId((FORECAST_SECTORS as any)[newSectorId]?.region || '')
			closeSectorSelectorPanel()
		})
	}, [closeSectorSelectorPanel, updateOnChangeSectorSelectorSectorHandler])

	// derive product options that exist across 2+ levels
	const productOptions = useMemo(() => {
		const map = new Map<string, Set<string>>()
		sortedProductEntries.forEach((entry) => {
			entry.products.forEach((p) => {
				const set = map.get(p) ?? new Set<string>()
				set.add(entry.level)
				map.set(p, set)
			})
		})
		const candidates = Array.from(map.entries())
			.filter(([, levels]) => levels.size >= 2)
			.map(([productId]) => ({ value: productId, label: (FORECAST_PRODUCTS as any)[productId]?.name || productId }))
		if (candidates.length === 0) return [{ value: 'null', label: 'Unavailable' }]
		return candidates
	}, [sortedProductEntries])

	const [selectedProduct, setSelectedProduct] = useState<string>(() => {
		const first = productOptions[0]
		// prefer the current route product if it exists in options
		if (productOptions.find((o) => o.value === (productId as string))) return productId as string
		return first ? first.value : 'null'
	})

	useEffect(() => {
		// keep selection in sync if options change and current selection disappears
		if (!productOptions.find((o) => o.value === selectedProduct)) {
			setSelectedProduct(productOptions[0]?.value ?? 'null')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productOptions])

	const handleRegionChange = (newRegionId: string) => {
		setRegionId(newRegionId)
		openSectorSelectorPanel()
	}

	const handleSectorChangeButton = () => {
		// open the sector selector so user can pick a sector visually
		openSectorSelectorPanel()
	}

	const returnLink = `/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${levelId}/${productId}`

	const handleLoadComparison = () => {
		if (selectedProduct === 'null') {
			alert('No products available for comparison with current parameters chosen. Please adjust and select product.')
			return
		}
		const baseParams = [runId, modelId, internalSectorId, levelId, selectedProduct].join('/')
		const route = `/weather-data/forecast-models/${baseParams}/compare-height/${validTimeId}`
		router.push(route)
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastCompareHeightSidebarPanel}>
				<SidebarSectionHeader name="Return to Forecast Models" linkUrl={returnLink} />
				<div className={styles.options}>
					<label>Model:</label>
					<Select
						value={internalModelId}
						placeholder={internalModelId as string}
						options={allowedModelKeys.map((m) => ({ value: m, label: (FORECAST_MODELS as any)[m].name }))}
						onChange={(m) => setInternalModelId(m)}
					/>
					<label>Sector Size:</label>
					<Select
						value={regionId}
						placeholder={(FORECAST_REGIONS as any)[regionId]?.label ?? ''}
						options={Object.keys(FORECAST_REGIONS).map((r) => ({ value: r, label: (FORECAST_REGIONS as any)[r].label }))}
						onChange={handleRegionChange}
					/>
					<SectorChangeButton
						onClick={handleSectorChangeButton}
						label="Selected Sector:"
						labelValue={(FORECAST_SECTORS as any)[internalSectorId as string]?.name ?? 'Unknown Sector'}
					/>

					<label>Product:</label>
					<Select value={selectedProduct} placeholder={selectedProduct} options={productOptions} onChange={(v) => setSelectedProduct(v)} />

					<Button label="Load Comparison" disabled={false} onClick={handleLoadComparison} />
				</div>
			</div>
		</ScrollArea>
	)
}

export default ForecastCompareHeightSidebarPanel
