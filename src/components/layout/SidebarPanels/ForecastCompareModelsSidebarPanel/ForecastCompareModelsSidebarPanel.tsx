'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import Toggle from '@/components/elements/Toggle/Toggle'
import ValidtimeSelect from '@/components/elements/ValidtimeSelect/ValidtimeSelect'
import { FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_REGIONS } from '@/data/forecast/regions'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { PRODUCT_INFO_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { getCompareModelsData } from '@/util/dataCalls/forecast/query-comparisons'
import { buildProductsByLevel, fetchFloaterSectorData, getModelProductInfoId } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastCompareModelsSidebarPanel.module.scss'

const ForecastCompareModelsSidebarPanel = () => {
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
	const runFlag = useRootStore.use.runFlag()
	const setRunFlag = useRootStore.use.setRunFlag()
	// for functioning accordian
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const openIndexRef = useRef<number | null>(null)
	// region/sector state (used by the sector selector)
	const regionInitial = (FORECAST_SECTORS as any)[sectorId as string]?.region || ''
	const [regionId, setRegionId] = useState<string>(regionInitial)
	// keep product entries grouped by level and update whenever model or internal sector change
	const [sortedProductEntries, setSortedProductEntries] = useState<Array<{ level: string; products: string[] }>>([])
	const [validtimes, setValidTimes] = useState<string[]>([])
	// track active models to build proper sector and product options
	const [activeModels, setActiveModels] = useState<string[]>([])
	const [sectorOptions, setSectorOptions] = useState<string[]>([])

	const getData = useCallback(async () => {
		const data = await getCompareModelsData(runId, sectorId, levelId, productId, validTimeId, runFlag)
		console.log('Comparison Models Data:', data)
		if (data.frames.length === 0) {
			const sanitizedModelId = FORECAST_MODELS[modelId as string] || DEFAULT_FORECAST_MODEL
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
			const sanitizedValidTimeId = !data.validtimes.includes(validTimeId)
				? findClosestNumber(Number(validTimeId), data.validtimes)
				: validTimeId
			if (
				modelId !== sanitizedModelId ||
				sectorId !== sanitizedSectorId ||
				levelId !== sanitizedLevelId ||
				productId !== sanitizedProductId ||
				validTimeId !== sanitizedValidTimeId
			) {
				const baseParmsString = `${runId}/${sanitizedModelId}/${sanitizedSectorId}/${sanitizedLevelId}/${sanitizedProductId}`
				console.log('ForecastCompareModelsSidebarPanel: redirecting to closest validtime - second push')
				router.push(`/weather-data/forecast-models/${baseParmsString}/compare-models/${sanitizedValidTimeId}`)
			}
		} else {
			setActiveModels(data.models)
			setValidTimes(data.validtimes)
		}
	}, [runId, sectorId, levelId, productId, validTimeId, runFlag, router, modelId])

	const findClosestNumber = (num: number, arr: number[]): number => {
		return arr.reduce((prev, curr) => {
			return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev
		})
	}

	useEffect(() => {
		getData()
	}, [runId, sectorId, levelId, productId, validTimeId, runFlag, getData])

	const comparableProductsByLevel = useCallback(() => {
		// build a count map keyed by level -> product -> number of models that include that (count each model once)
		const levelProductCount: Record<string, Record<string, number>> = {}

		for (const modelKey of activeModels) {
			const model = (FORECAST_MODELS as any)[modelKey]
			if (!model || !Array.isArray(model.sectors)) continue
			// skip models that don't include the currently selected sector
			if (!model.sectors.includes(sectorId as string)) continue

			const modelProductsByLevel = model.products[sectorId as string] || model.products['general']
			// per-model seen set to avoid double-counting the same level+product for one model
			const seenThisModel = new Set<string>()

			for (const [level, products] of Object.entries(modelProductsByLevel)) {
				for (const p of products as string[]) {
					const key = `${level}::${p}`
					if (seenThisModel.has(key)) continue
					seenThisModel.add(key)

					if (!levelProductCount[level]) levelProductCount[level] = {}
					levelProductCount[level][p] = (levelProductCount[level][p] || 0) + 1
				}
			}
		}

		// produce productsByLevel containing only products that appear in 2+ models at the same level
		const productsByLevel = Object.entries(levelProductCount)
			.map(([level, prodCounts]) => {
				const products = Object.entries(prodCounts)
					.filter(([, count]) => count >= 2)
					.map(([product]) => product)
				return { level, products }
			})
			.filter((entry) => entry.products.length > 0)

		return productsByLevel
	}, [sectorId, activeModels])

	useEffect(() => {
		if (activeModels.length === 0) return
		if (!activeModels.includes(modelId as string)) {
			// first step, ensure the current model is in the active list
			const newModelId = activeModels[0]
			const baseParams = [runId, newModelId, sectorId, levelId, productId].join('/')
			router.push(`/weather-data/forecast-models/${baseParams}/compare-models/${validTimeId}`)
			return
		}
		// create an array of common sectors across all active models (appear in 2+ models)
		const sectorCounts: Record<string, number> = {}
		for (const modelKey of activeModels) {
			const model = (FORECAST_MODELS as any)[modelKey]
			if (!model || !Array.isArray(model.sectors)) continue
			for (const sId of Array.from(new Set(model.sectors)) as string[]) {
				sectorCounts[sId] = (sectorCounts[sId] || 0) + 1
			}
		}
		const sectorOptions = Object.keys(sectorCounts).filter((sId) => sectorCounts[sId] >= 2)
		if (!sectorOptions.includes(sectorId as string)) {
			const newSectorId = sectorOptions[0]
			const baseParams = [runId, modelId, newSectorId, levelId, productId].join('/')
			router.push(`/weather-data/forecast-models/${baseParams}/compare-models/${validTimeId}`)
			return
		}
		setSectorOptions(sectorOptions)

		const productsByLevel = comparableProductsByLevel()
		const levelIndex = productsByLevel.findIndex((item) => item.level === levelId)
		if (openIndexRef.current !== levelIndex) {
			setOpenIndex(levelIndex)
		}
		setSortedProductEntries(productsByLevel)
	}, [activeModels, sectorId, modelId, levelId, productId, runId, validTimeId, router, comparableProductsByLevel])

	// when the sector selector slideout opens, populate it with sectors and floater data
	useEffect(() => {
		if (sectorSelectorPanelIsOpen && sectorOptions.length > 0) {
			const loadSectorData = async () => {
				const region = (FORECAST_REGIONS as any)[regionId as string]
				const newD3config = {
					rotate: region?.rotate,
					scale: region?.scale,
				}
				setSectorSelectorD3config(newD3config)
				const updatedSectorData = await fetchFloaterSectorData()
				const selectedSectors = sectorOptions
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
	}, [sectorSelectorPanelIsOpen, regionId, setSectorSelectorD3config, setSectorSelectorSectors, sectorOptions])

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((newSectorId: string) => {
			closeSectorSelectorPanel()
			const baseParams = [runId, modelId, newSectorId, levelId, productId].join('/')
			router.push(`/weather-data/forecast-models/${baseParams}/compare-models/${validTimeId}`)
		})
	}, [closeSectorSelectorPanel, updateOnChangeSectorSelectorSectorHandler, runId, modelId, levelId, productId, validTimeId, sectorId, router])

	const handleRegionChange = (newRegionId: string) => {
		setRegionId(newRegionId)
		openSectorSelectorPanel()
	}
	const handleSectorChangeButton = () => {
		openSectorSelectorPanel()
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
		const route = `/weather-data/forecast-models/${baseParams}/compare-models/${newValidTimeId}`
		router.push(route)
	}

	useEffect(() => {
		openIndexRef.current = openIndex
	}, [openIndex])

	const handleAccordionMenu = (index: number) => {
		setOpenIndex(openIndex === index ? null : index) // Close if already open, otherwise open the clicked accordion
	}

	const handleRunFlagToggle = (value: boolean) => {
		const newRunFlag = value ? 'recent' : 'similar'
		setRunFlag(newRunFlag)
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastCompareModelsSidebarPanel}>
				<SidebarSectionHeader name="Return to Forecast Models" linkUrl={returnLink} />
				<div className={styles.options}>
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
					<label>Run Preference:</label>
					<div className={styles.runPreferenceToggle}>
						<span className={styles.blurb}>Prefer recent runs over similar:</span>
						<Toggle value={runFlag === 'recent'} onClick={handleRunFlagToggle} />
					</div>
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
							onToggle={() => handleAccordionMenu(index)}
						>
							<div className={styles.forecastProducts}>
								{(products as string[]).map((product) => {
									const productInfoId = getModelProductInfoId(FORECAST_PRODUCTS[product], level, modelId as string)
									const sidebarLinkProps: any = {
										name: FORECAST_PRODUCTS[product].name,
										active: product === productId && level === levelId,
										infoId: productInfoId,
										linkUrl: `/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${level}/${product}/compare-models/${validTimeId}`,
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

export default ForecastCompareModelsSidebarPanel
