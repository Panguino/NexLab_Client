'use client'

import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_REGIONS } from '@/data/forecast/regions'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { useRootStore } from '@/store/useRootStore'
import { getCompareHeightData } from '@/util/dataCalls/forecast/query-comparisons'
import { buildProductsByLevel, fetchFloaterSectorData } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
	const returnLink = `/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${levelId}/${productId}`

	// root-store hooks used for opening sector picker and wiring the selector panel
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	// models to omit from the Model Select
	const OMIT_MODELS = ['HRRR', 'NAMNST', 'CFS', 'SREF', 'GEFS']
	const allowedModelKeys = Object.keys(FORECAST_MODELS).filter((m) => !OMIT_MODELS.includes(m))
	// region/sector state (used by the sector selector)
	const regionInitial = (FORECAST_SECTORS as any)[sectorId as string]?.region || ''
	const [regionId, setRegionId] = useState<string>(regionInitial)
	// keep product entries grouped by level and update whenever model or internal sector change
	const [sortedProductEntries, setSortedProductEntries] = useState<Array<{ level: string; products: string[] }>>([])
	const [validtimes, setValidTimes] = useState<string[]>([])

	const getData = useCallback(async () => {
		const sanitizedModelId = !FORECAST_MODELS[modelId as string] ? DEFAULT_FORECAST_MODEL : modelId
		const sanitizedSectorId = FORECAST_MODELS[sanitizedModelId as string].sectors.includes(sectorId as string)
			? sectorId
			: FORECAST_MODELS[sanitizedModelId as string].defaults.sector
		const productsByLevel = buildProductsByLevel(sanitizedModelId as string, sanitizedSectorId as string)
		const productOptions = getCompariables(productsByLevel)
		const defaultProduct = productOptions[0]?.value || null
		const sanitizedProductId = productOptions.some((opt) => opt.value === productId) ? productId : defaultProduct
		// these next two are primarily to prevent URL manipulation from breaking
		const sanitizedRunId = Number(runId) > 0 && runId.length === 10 ? runId : 0
		const sanitizedValidTimeId = Number(validTimeId) > 0 ? validTimeId : 0
		if (
			sanitizedModelId !== modelId ||
			sanitizedRunId !== runId ||
			sanitizedSectorId !== sectorId ||
			sanitizedProductId !== productId ||
			sanitizedValidTimeId !== validTimeId
		) {
			const baseParmsString = `${sanitizedRunId}/${sanitizedModelId}/${sanitizedSectorId}/${levelId}/${sanitizedProductId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/compare-height/${sanitizedValidTimeId}`)
		} else {
			const data = await getCompareHeightData(sanitizedModelId, sanitizedRunId, sanitizedSectorId, sanitizedProductId, sanitizedValidTimeId)
			console.log('Comparison Height Data:', data)
			setValidTimes(data.validtimes)
			setSortedProductEntries(productsByLevel)
		}
	}, [modelId, sectorId, productId, runId, validTimeId, levelId, router])

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, productId, validTimeId, getData])

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
				const modelKey = (FORECAST_MODELS as any)[modelId as string] ? (modelId as string) : DEFAULT_FORECAST_MODEL
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
	}, [sectorSelectorPanelIsOpen, modelId, regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((newSectorId: string) => {
			closeSectorSelectorPanel()
			const baseParams = [runId, modelId, newSectorId, levelId, productId].join('/')
			router.push(`/weather-data/forecast-models/${baseParams}/compare-height/${validTimeId}`)
		})
	}, [closeSectorSelectorPanel, updateOnChangeSectorSelectorSectorHandler, runId, modelId, levelId, productId, validTimeId, sectorId, router])

	const getCompariables = (sortedProductEntries) => {
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
	}
	// derive product options that exist across 2+ levels
	const productOptions = useMemo(() => {
		return getCompariables(sortedProductEntries)
	}, [sortedProductEntries])

	const handleRegionChange = (newRegionId: string) => {
		setRegionId(newRegionId)
		openSectorSelectorPanel()
	}

	const handleSectorChangeButton = () => {
		openSectorSelectorPanel()
	}

	const handleProductChange = (newProductId: string) => {
		if (!newProductId || newProductId === productId) return
		console.log('Product changed to:', newProductId)
		const baseParams = [runId, modelId, sectorId, levelId, newProductId].join('/')
		const route = `/weather-data/forecast-models/${baseParams}/compare-height/${validTimeId}`
		router.push(route)
	}

	const handleModelChange = (newModelId: string) => {
		if (!newModelId || newModelId === modelId) return
		console.log('Model changed to:', newModelId)
		const baseParams = [runId, newModelId, sectorId, levelId, productId].join('/')
		const route = `/weather-data/forecast-models/${baseParams}/compare-height/${validTimeId}`
		router.push(route)
	}
	const handleValidTimeChange = (newValidTimeId: string) => {
		if (!newValidTimeId || newValidTimeId === validTimeId) return
		console.log('Valid Time changed to:', newValidTimeId)
		const baseParams = [runId, modelId, sectorId, levelId, productId].join('/')
		const route = `/weather-data/forecast-models/${baseParams}/compare-height/${newValidTimeId}`
		router.push(route)
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastCompareHeightSidebarPanel}>
				<SidebarSectionHeader name="Return to Forecast Models" linkUrl={returnLink} />
				<div className={styles.options}>
					<label>Model:</label>
					<Select
						value={modelId}
						placeholder={modelId as string}
						options={allowedModelKeys.map((model) => ({ value: model, label: (FORECAST_MODELS as any)[model].name }))}
						onChange={(newModelId) => handleModelChange(newModelId)}
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
						labelValue={(FORECAST_SECTORS as any)[sectorId as string]?.name ?? 'Unknown Sector'}
					/>

					<label>Product:</label>
					<Select
						value={productId}
						placeholder={productId as string}
						options={productOptions}
						onChange={(newProductId) => handleProductChange(newProductId)}
					/>

					<label>Valid Time:</label>
					<Select
						value={validTimeId}
						placeholder={validTimeId as string}
						options={validtimes.map((validtime) => ({ value: validtime, label: validtime }))}
						onChange={(newValidTimeId) => handleValidTimeChange(newValidTimeId)}
					/>
				</div>
			</div>
		</ScrollArea>
	)
}

export default ForecastCompareHeightSidebarPanel
