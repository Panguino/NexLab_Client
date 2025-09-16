'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import ValidtimeSelect from '@/components/elements/ValidtimeSelect/ValidtimeSelect'
import { FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_REGIONS } from '@/data/forecast/regions'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { PRODUCT_INFO_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { getCompareRunsData } from '@/util/dataCalls/forecast/query-comparisons'
import { buildProductsByLevel, fetchFloaterSectorData, getModelProductInfoId } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastCompareRunsSidebarPanel.module.scss'

const ForecastCompareRunsSidebarPanel = () => {
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
	const setProductInfoId = useRootStore.use.setProductInfoId()
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()
	// for functioning accordian
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const openIndexRef = useRef<number | null>(null)
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
		const sanitizedLevelId = productsByLevel.some((entry) => entry.level === levelId)
			? levelId
			: productsByLevel[productsByLevel.length - 1]?.level || ''
		const productOptions = productsByLevel.find((entry) => entry.level === sanitizedLevelId)?.products || []
		const defaultProduct = productOptions[0] || null
		const sanitizedProductId = productOptions.some((opt) => opt === productId) ? productId : defaultProduct
		// these next two are primarily to prevent URL manipulation from breaking -- we don't expect this page to ever change runId
		const sanitizedRunId = Number(runId) > 0 && runId.length === 10 ? runId : 0
		const sanitizedValidTimeId = Number(validTimeId) > 0 ? validTimeId : 0
		if (
			sanitizedModelId !== modelId ||
			sanitizedRunId !== runId ||
			sanitizedSectorId !== sectorId ||
			sanitizedLevelId !== levelId ||
			sanitizedProductId !== productId ||
			sanitizedValidTimeId !== validTimeId
		) {
			const baseParmsString = `${sanitizedRunId}/${sanitizedModelId}/${sanitizedSectorId}/${levelId}/${sanitizedProductId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/compare-runs/${sanitizedValidTimeId}`)
		} else {
			const data = await getCompareRunsData(sanitizedModelId, sanitizedSectorId, sanitizedLevelId, sanitizedProductId, sanitizedValidTimeId)
			console.log('Comparison Runs Data:', data)
			if (!data.validtimes.includes(sanitizedValidTimeId)) {
				const closestValidtime = findClosestNumber(Number(sanitizedValidTimeId), data.validtimes)
				const baseParmsString = `${sanitizedRunId}/${sanitizedModelId}/${sanitizedSectorId}/${sanitizedLevelId}/${sanitizedProductId}`
				router.push(`/weather-data/forecast-models/${baseParmsString}/compare-runs/${closestValidtime}`)
			}
			setValidTimes(data.validtimes)
			setSortedProductEntries(productsByLevel)
			const levelIndex = productsByLevel.findIndex((item) => item.level === sanitizedLevelId)
			if (openIndexRef.current !== levelIndex) {
				setOpenIndex(levelIndex)
			}
		}
	}, [modelId, sectorId, productId, runId, validTimeId, levelId, router])

	const findClosestNumber = (num: number, arr: number[]): number => {
		return arr.reduce((prev, curr) => {
			return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
		})
	}

	useEffect(() => {
		getData()
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, getData])

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
			router.push(`/weather-data/forecast-models/${baseParams}/compare-runs/${validTimeId}`)
		})
	}, [closeSectorSelectorPanel, updateOnChangeSectorSelectorSectorHandler, runId, modelId, levelId, productId, validTimeId, sectorId, router])

	const handleRegionChange = (newRegionId: string) => {
		setRegionId(newRegionId)
		openSectorSelectorPanel()
	}
	const handleSectorChangeButton = () => {
		openSectorSelectorPanel()
	}
	const modelOptions = Object.keys(FORECAST_MODELS).map((modelId) => ({
		value: modelId,
		label: FORECAST_MODELS[modelId].name,
	}))

	const handleModelChange = (newModelId: string) => {
		if (!newModelId || newModelId === modelId) return
		console.log('Model changed to:', newModelId)
		const baseParams = [runId, newModelId, sectorId, levelId, productId].join('/')
		const route = `/weather-data/forecast-models/${baseParams}/compare-runs/${validTimeId}`
		router.push(route)
	}

	// format a unix timestamp (seconds or milliseconds) into 'HHZ MM/DD/YY'
	const formatValidTimeLabel = (ts: string | number) => {
		const n = Number(ts)
		if (Number.isNaN(n)) return String(ts)
		const ms = n > 1e12 ? n : n * 1000
		const d = new Date(ms)
		const hh = String(d.getUTCHours()).padStart(2, '0')
		const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
		const dd = String(d.getUTCDate()).padStart(2, '0')
		const yy = String(d.getUTCFullYear() % 100).padStart(2, '0')
		return `${hh}Z ${mm}/${dd}/${yy}`
	}
	const handleValidTimeChange = (newValidTimeId: string) => {
		if (!newValidTimeId || newValidTimeId === validTimeId) return
		console.log('Valid Time changed to:', newValidTimeId)
		const baseParams = [runId, modelId, sectorId, levelId, productId].join('/')
		const route = `/weather-data/forecast-models/${baseParams}/compare-runs/${newValidTimeId}`
		router.push(route)
	}

	useEffect(() => {
		openIndexRef.current = openIndex
	}, [openIndex])

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index) // Close if already open, otherwise open the clicked accordion
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastCompareRunsSidebarPanel}>
				<SidebarSectionHeader name="Return to Forecast Models" linkUrl={returnLink} />
				<div className={styles.options}>
					<label>Model:</label>
					<Select
						value={modelId}
						placeholder={modelId as string}
						options={modelOptions}
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
					<label>Valid Time:</label>
					<ValidtimeSelect
						value={validTimeId}
						placeholder={formatValidTimeLabel(validTimeId as string)}
						options={validtimes.map((vt) => ({ value: String(vt) }))}
						onChange={(newValidTimeId) => handleValidTimeChange(newValidTimeId)}
					/>

					<label>Products:</label>
					{sortedProductEntries.map(({ level, products }, index) => (
						<Accordian
							key={level}
							title={FORECAST_LEVELS[level].name}
							variant="sidebar"
							isOpen={openIndex === index}
							onToggle={() => handleToggle(index)}
						>
							<div className={styles.forecastProducts}>
								{(products as string[]).map((product) => {
									const productInfoId = getModelProductInfoId(FORECAST_PRODUCTS[product], level, modelId as string)
									const sidebarLinkProps: any = {
										name: FORECAST_PRODUCTS[product].name,
										active: product === productId && level === levelId,
										infoId: productInfoId,
										linkUrl: `/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${level}/${product}/compare-runs/${validTimeId}`,
									}
									if (productInfoId !== false) {
										sidebarLinkProps.onInfoClick = () => {
											setProductInfoId(productInfoId)
											openSlideoutPanel(PRODUCT_INFO_SLIDEOUT)
										}
									}
									return <SidebarLink key={product} {...sidebarLinkProps} />
								})}
							</div>
						</Accordian>
					))}
				</div>
			</div>
		</ScrollArea>
	)
}

export default ForecastCompareRunsSidebarPanel
