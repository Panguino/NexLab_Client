'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { FORECAST_LEVEL_ORDER, FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_REGIONS } from '@/data/forecast/regions'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { useRootStore } from '@/store/useRootStore'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastSidebarPanel.module.scss'

const ForecastSidebarPanel = () => {
	const router = useRouter()
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const [sortedProductEntries, setSortedProductEntries] = useState([])
	const [regionId, setRegionId] = useState('')
	const {
		forecastRunId: runId,
		forecastModelId: modelId,
		forecastSectorId: sectorId,
		forecastLevelId: levelId,
		forecastProductId: productId,
	} = useParams()
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const openIndexRef = useRef<number | null>(null)

	useEffect(() => {
		if (
			!FORECAST_MODELS[modelId as string] || // Check if the model exists
			!FORECAST_MODELS[modelId as string].sectors.includes(sectorId as string) || // Check if the sector exists in the model
			(!FORECAST_MODELS[modelId as string].products[sectorId as string]?.[levelId as string] &&
				!FORECAST_MODELS[modelId as string].products['general'][levelId as string]) || // Check if the level exists in the sector
			(!FORECAST_MODELS[modelId as string].products[sectorId as string]?.[levelId as string]?.includes(productId as string) &&
				!FORECAST_MODELS[modelId as string].products['general'][levelId as string]?.includes(productId as string)) // Check if the product exists in the level
		) {
			const modelIdDefault = FORECAST_MODELS[modelId as string] ? modelId : DEFAULT_FORECAST_MODEL
			const DEFAULT_FORECAST_SECTOR = FORECAST_MODELS[modelIdDefault as string].defaults.sector
			const DEFAULT_FORECAST_LEVEL = FORECAST_MODELS[modelIdDefault as string].defaults.level
			const DEFAULT_FORECAST_PRODUCT = FORECAST_MODELS[modelIdDefault as string].defaults.product
			console.log(
				`Invalid forecast parameters: runId=${runId}, modelId=${modelId}, sectorId=${sectorId}, levelId=${levelId}, productId=${productId}. Redirecting to default.`,
				runId,
				modelIdDefault,
				DEFAULT_FORECAST_SECTOR,
				DEFAULT_FORECAST_LEVEL,
				DEFAULT_FORECAST_PRODUCT,
			)
			router.push(
				`/weather-data/forecast-models/${runId}/${modelIdDefault}/${DEFAULT_FORECAST_SECTOR}/${DEFAULT_FORECAST_LEVEL}/${DEFAULT_FORECAST_PRODUCT}`,
			)
		} else {
			const productsByLevel = buildProductsByLevel(modelId as string, sectorId as string)
			const levelIndex = productsByLevel.findIndex((item) => item.level === levelId)
			if (openIndexRef.current !== levelIndex) {
				setOpenIndex(levelIndex)
			}
			setSortedProductEntries(productsByLevel)
			setRegionId(FORECAST_SECTORS[sectorId as string].region)
		}
	}, [runId, modelId, sectorId, levelId, productId, router])

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sectorId) => {
			closeSectorSelectorPanel()
			router.push(`/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${levelId}/${productId}`)
		})
	}, [runId, modelId, levelId, productId, closeSectorSelectorPanel, router, updateOnChangeSectorSelectorSectorHandler])

	useEffect(() => {
		if (sectorSelectorPanelIsOpen) {
			// We may expand to allow for more regions in the future, but for now we only have one region
			const region = FORECAST_REGIONS[regionId as string]
			const newD3config = {
				rotate: region.rotate,
				scale: region.scale,
			}
			setSectorSelectorD3config(newD3config)
			const selectedSectors = FORECAST_MODELS[modelId as string].sectors
				.filter((sectorId) => FORECAST_SECTORS[sectorId].region === regionId)
				.map((sectorId) => ({
					id: sectorId,
					...FORECAST_SECTORS[sectorId],
				}))
			setSectorSelectorSectors(selectedSectors)
		}
	}, [sectorSelectorPanelIsOpen, modelId, regionId, setSectorSelectorD3config, setSectorSelectorSectors])

	const handleRegionChange = (regionId: string) => {
		setRegionId(regionId)
		openSectorSelectorPanel()
	}
	const handleSectorChangeButton = () => {
		if (regionId !== FORECAST_SECTORS[sectorId as string].region) {
			setRegionId(FORECAST_SECTORS[sectorId as string].region)
		}
		openSectorSelectorPanel()
	}

	// get products grouped by level to build the sidebar
	const buildProductsByLevel = (modelId: string, sectorId: string) => {
		if (!FORECAST_MODELS[modelId]) return []
		const productArray = FORECAST_MODELS[modelId].products?.[sectorId] ?? FORECAST_MODELS[modelId].products['general']
		const levelOrder = FORECAST_LEVEL_ORDER
		const productsByLevel = levelOrder
			.filter((level) => productArray[level])
			.map((level) => ({
				level,
				products: productArray[level] as string[],
			}))
		return productsByLevel
	}

	const modelOptions = Object.keys(FORECAST_MODELS).map((modelId) => ({
		value: modelId,
		label: FORECAST_MODELS[modelId].name,
	}))

	useEffect(() => {
		openIndexRef.current = openIndex
	}, [openIndex])

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index) // Close if already open, otherwise open the clicked accordion
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastSidebarPanel}>
				<div className={styles.options}>
					<Select
						value={modelId}
						placeholder={modelId as string}
						title="Model:"
						options={modelOptions}
						onChange={(value) => router.push(`/weather-data/forecast-models/${runId}/${value}/${sectorId}/${levelId}/${productId}`)}
					/>
					<Select
						value={regionId}
						placeholder={FORECAST_REGIONS[regionId as string]?.label ?? ''}
						title="Sector Size:"
						options={Object.keys(FORECAST_REGIONS).map((regionId) => ({
							value: regionId,
							label: FORECAST_REGIONS[regionId].label,
						}))}
						onChange={handleRegionChange}
					/>
					<SectorChangeButton
						onClick={handleSectorChangeButton}
						label="Selected Sector:"
						labelValue={FORECAST_SECTORS[sectorId as string]?.name ?? 'Unknown Sector'}
					/>
				</div>
				{sortedProductEntries.map(({ level, products }, index) => (
					<Accordian
						key={level}
						title={FORECAST_LEVELS[level].name}
						variant="sidebar"
						isOpen={openIndex === index}
						onToggle={() => handleToggle(index)}
					>
						<div className={styles.forecastProducts}>
							{(products as string[]).map((product) => (
								<SidebarLink
									key={product}
									name={FORECAST_PRODUCTS[product].name}
									active={product === productId && level === levelId}
									onClick={() => router.push(`/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${level}/${product}`)}
								/>
							))}
						</div>
					</Accordian>
				))}
			</div>
		</ScrollArea>
	)
}

export default ForecastSidebarPanel
