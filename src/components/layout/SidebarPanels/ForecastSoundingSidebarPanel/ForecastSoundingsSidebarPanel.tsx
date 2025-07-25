'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { Button } from '@/components/elements/Button/Button'
import Input from '@/components/elements/Input/Input'
import { SectorChangeButton } from '@/components/elements/SectorChangeButton/SectorChangeButton'
import Select from '@/components/elements/Select/Select'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_REGIONS } from '@/data/forecast/regions'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { FORECAST_SOUNDING_PARCEL_OPTIONS, FORECAST_SOUNDING_WEATHER_OPTIONS } from '@/data/forecast/soundingOptions'
import { useRootStore } from '@/store/useRootStore'
import { buildProductsByLevel, fetchFloaterSectorData, fetchStationCoordinates } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ScrollArea from '../../ScrollArea/ScrollArea'
import styles from './ForecastSoundingsSidebarPanel.module.scss'

const ForecastSoundingsSidebarPanel = () => {
	const {
		fcstModel: modelId,
		fcstRun: runId,
		fcstSector: sectorId,
		fcstLevel: levelId,
		fcstProduct: productId,
		fcstSndValid: validTimeId,
		fcstSndLoc: tempLocId,
		fcstSndParcel: parcelId,
		fcstSndWeather: weatherId,
	} = useParams()
	const router = useRouter()
	// sounding location prep
	const decodedLocationId = tempLocId ? decodeURIComponent(tempLocId as string) : null
	const isStationId = decodedLocationId?.length === 4 && !decodedLocationId?.includes(',')
	const [locationId, setLocationId] = useState(decodedLocationId)

	// menu prep
	const [sortedProductEntries, setSortedProductEntries] = useState([])
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const openIndexRef = useRef<number | null>(null)
	const [internalModelId, setInternalModelId] = useState(modelId)
	// const [internalRunId, setInternalRunId] = useState(runId)
	const [internalLocationId, setInternalLocationId] = useState(locationId)
	// const [internalValidTimeId, setInternalValidTimeId] = useState(validTimeId)
	const [internalParcelId, setInternalParcelId] = useState(parcelId)
	const [internalWeatherId, setInternalWeatherId] = useState(weatherId)
	const [allowGenerateSounding, setAllowGenerateSounding] = useState(false)

	// sector map stuff
	const openSectorSelectorPanel = useRootStore.use.openSectorSelectorPanel()
	const closeSectorSelectorPanel = useRootStore.use.closeSectorSelectorPanel()
	const sectorSelectorPanelIsOpen = useRootStore.use.sectorSelectorPanelIsOpen()
	const setSectorSelectorSectors = useRootStore.use.setSectorSelectorSectors()
	const setSectorSelectorD3config = useRootStore.use.setSectorSelectorD3config()
	const updateOnChangeSectorSelectorSectorHandler = useRootStore.use.updateOnChangeSectorSelectorSectorHandler()
	const [regionId, setRegionId] = useState('')

	useEffect(() => {
		const sanitizedModelId = !FORECAST_MODELS[modelId as string] ? DEFAULT_FORECAST_MODEL : modelId
		const sanitizedSectorId = FORECAST_MODELS[sanitizedModelId as string].sectors.includes(sectorId as string)
			? sectorId
			: FORECAST_MODELS[sanitizedModelId as string].defaults.sector
		const productsByLevel = buildProductsByLevel(sanitizedModelId as string, sanitizedSectorId as string)
		const allProducts = productsByLevel.flatMap((item: { products: string[] }) => item.products)
		const defaultLevel = FORECAST_MODELS[sanitizedModelId as string].defaults.level
		const defaultProduct = FORECAST_MODELS[sanitizedModelId as string].defaults.product
		let sanitizedLevelId, sanitizedProductId
		if (productsByLevel.find((item) => item.level === levelId && item.products.includes(productId as string))) {
			// product exists for the level
			sanitizedLevelId = levelId
			sanitizedProductId = productId
		} else if (productsByLevel.some((item) => item.products.includes(productId as string))) {
			// product exists for some level just not the one requested
			sanitizedLevelId = productsByLevel.find((item) => item.products.includes(productId as string))?.level
			sanitizedProductId = productId
		} else if (
			allProducts.indexOf(productId as string) < 0 &&
			productsByLevel.find((item) => item.level === levelId)?.products.includes(defaultProduct)
		) {
			// the requested product doesnt exist anywhere, but the default product does exist for the requested level
			sanitizedLevelId = levelId
			sanitizedProductId = defaultProduct
		} else if (allProducts.indexOf(productId as string) < 0) {
			// product doesnt exist anywhere
			sanitizedLevelId = defaultLevel
			sanitizedProductId = defaultProduct
		}

		if (sanitizedModelId !== modelId || sanitizedSectorId !== sectorId || sanitizedLevelId !== levelId || sanitizedProductId !== productId) {
			const baseParmsString = `${runId}/${sanitizedModelId}/${sanitizedSectorId}/${sanitizedLevelId}/${sanitizedProductId}`
			const soundingParmsString = `${validTimeId}/${locationId}/${parcelId}/${weatherId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		} else {
			const levelIndex = productsByLevel.findIndex((item) => item.level === levelId)
			if (openIndexRef.current !== levelIndex) {
				setOpenIndex(levelIndex)
			}
			setSortedProductEntries(productsByLevel)
			setRegionId(FORECAST_SECTORS[sectorId as string].region)
		}
	}, [runId, modelId, sectorId, levelId, productId, setSortedProductEntries, router, validTimeId, locationId, parcelId, weatherId])

	useEffect(() => {
		const fetchLocation = async () => {
			// Only fetch if this is a station ID
			if (isStationId && decodedLocationId) {
				// Using our utility function
				const convertedCoordinates = await fetchStationCoordinates(decodedLocationId)
				setLocationId(convertedCoordinates)
			} else {
				setLocationId(decodedLocationId)
			}
		}
		fetchLocation()
	}, [decodedLocationId, isStationId])

	useEffect(() => {
		setInternalLocationId(locationId)
	}, [locationId])

	useEffect(() => {
		updateOnChangeSectorSelectorSectorHandler((sector) => {
			closeSectorSelectorPanel()
			const baseParmsString = `${runId}/${modelId}/${sector}/${levelId}/${productId}`
			const soundingParmsString = `${validTimeId}/${locationId}/${parcelId}/${weatherId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		})
	}, [
		runId,
		modelId,
		levelId,
		productId,
		closeSectorSelectorPanel,
		router,
		updateOnChangeSectorSelectorSectorHandler,
		validTimeId,
		locationId,
		parcelId,
		weatherId,
	])

	useEffect(() => {
		if (sectorSelectorPanelIsOpen) {
			const loadSectorData = async () => {
				const region = FORECAST_REGIONS[regionId as string]
				const newD3config = {
					rotate: region.rotate,
					scale: region.scale,
				}
				setSectorSelectorD3config(newD3config)
				const updatedSectorData = await fetchFloaterSectorData()
				const selectedSectors = FORECAST_MODELS[modelId as string].sectors
					.filter((sectorId) => FORECAST_SECTORS[sectorId].region === regionId)
					.map((sectorId) => {
						if (updatedSectorData && updatedSectorData[sectorId] && updatedSectorData[sectorId].coordinates) {
							return {
								id: sectorId,
								...FORECAST_SECTORS[sectorId],
								coordinates: updatedSectorData[sectorId].coordinates,
							}
						}
						return {
							id: sectorId,
							...FORECAST_SECTORS[sectorId],
						}
					})
				setSectorSelectorSectors(selectedSectors)
			}
			loadSectorData()
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
	const modelOptions = Object.keys(FORECAST_MODELS)
		.filter((model) => FORECAST_MODELS[model].allowForecastSounding === true)
		.map((model) => ({
			value: model,
			label: FORECAST_MODELS[model].name,
		}))

	const handleModelChange = (model: string) => {
		setInternalModelId(model)
		if (model !== modelId && !allowGenerateSounding) {
			// if selected model is different from current model and generate button has not been enabled, enable it
			setAllowGenerateSounding(true)
		}
	}
	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInternalLocationId(e.target.value)
		if (e.target.value !== locationId && !allowGenerateSounding) {
			// if entered location is different from current location and generate button has not been enabled, enable it
			setAllowGenerateSounding(true)
		}
	}
	const handleParcelChange = (parcel: string) => {
		setInternalParcelId(parcel)
		if (parcel !== parcelId && !allowGenerateSounding) {
			// if selected parcel is different from current parcel and generate button has not been enabled, enable it
			setAllowGenerateSounding(true)
		}
	}
	const handleWeatherChange = (weather: string) => {
		setInternalWeatherId(weather)
		if (weather !== weatherId && !allowGenerateSounding) {
			// if selected weather is different from current weather and generate button has not been enabled, enable it
			setAllowGenerateSounding(true)
		}
	}
	const handleGenerateSounding = () => {
		if (internalModelId !== modelId || internalLocationId !== locationId || internalParcelId !== parcelId || internalWeatherId !== weatherId) {
			const baseParmsString = `${runId}/${internalModelId}/${sectorId}/${levelId}/${productId}`
			const soundingParmsString = `${validTimeId}/${internalLocationId}/${internalParcelId}/${internalWeatherId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		}
	}

	useEffect(() => {
		openIndexRef.current = openIndex
	}, [openIndex])

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index) // Close if already open, otherwise open the clicked accordion
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastSoundingsSidebarPanel}>
				<div className={styles.options}>
					<Select
						value={internalModelId}
						placeholder={internalModelId as string}
						title="Model:"
						options={modelOptions}
						onChange={(model) => {
							handleModelChange(model)
						}}
					/>
					{runId && <p>Run ID: {runId}</p>}
					{validTimeId && <p>Valid Time ID: {validTimeId}</p>}
					<Input label="Location - (Lat,Lon or Station ID)" value={internalLocationId} onChange={handleLocationChange} />
					<Select
						value={internalParcelId}
						placeholder={parcelId as string}
						title="Parcel Type:"
						options={Object.values(FORECAST_SOUNDING_PARCEL_OPTIONS).map((option) => ({
							value: option.id,
							label: option.label,
						}))}
						onChange={handleParcelChange}
					/>
					<Select
						value={internalWeatherId}
						placeholder={weatherId as string}
						title="Weather Type:"
						options={Object.values(FORECAST_SOUNDING_WEATHER_OPTIONS).map((option) => ({
							value: option.id,
							label: option.label,
						}))}
						onChange={handleWeatherChange}
					/>
					<Button label="Generate Sounding" disabled={!allowGenerateSounding} onClick={handleGenerateSounding} />
				</div>
				<p>
					<strong>For Map Generation:</strong>
				</p>

				<div className={styles.options}>
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
									onClick={() => {
										const baseParmsString = `${runId}/${modelId}/${sectorId}/${level}/${product}`
										const soundingParmsString = `${validTimeId}/${locationId}/${parcelId}/${weatherId}`
										router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
									}}
								/>
							))}
						</div>
					</Accordian>
				))}
			</div>
		</ScrollArea>
	)
}

export default ForecastSoundingsSidebarPanel
