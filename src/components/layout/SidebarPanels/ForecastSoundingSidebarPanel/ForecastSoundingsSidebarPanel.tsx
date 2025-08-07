'use client'

import { Button } from '@/components/elements/Button/Button'
import Input from '@/components/elements/Input/Input'
import Select from '@/components/elements/Select/Select'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import {
	DEFAULT_FORECAST_SOUNDING_PARCEL,
	DEFAULT_FORECAST_SOUNDING_WEATHER,
	FORECAST_SOUNDING_PARCEL_OPTIONS,
	FORECAST_SOUNDING_WEATHER_OPTIONS,
} from '@/data/forecast/soundingOptions'
import { useRootStore } from '@/store/useRootStore'
import { buildProductsByLevel, fetchStationCoordinates } from '@/util/forecast/common-functions'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
	const locationId = tempLocId ? decodeURIComponent(tempLocId as string) : null // removes encoding from URL, specifically commas
	const isStationId = locationId?.length === 4 && !locationId?.includes(',')

	// menu prep
	// these references are specifically to avoid unnecessary re-renders and wait for a button click to update the URL
	const [internalModelId, setInternalModelId] = useState(modelId)
	const [internalLocationId, setInternalLocationId] = useState(locationId)
	const [internalParcelId, setInternalParcelId] = useState(parcelId)
	const [internalWeatherId, setInternalWeatherId] = useState(weatherId)
	const [allowGenerateSounding, setAllowGenerateSounding] = useState(false)
	const [returnLink, setReturnLink] = useState('')
	const forecastSoundingRunId = useRootStore.use.forecastSoundingRunId() // this version from the store helps to keep the sidebar in sync with the animator
	const forecastSoundingValidTime = useRootStore.use.forecastFrameValidTime()

	const sanitizeCollectAndSetData = useCallback(async () => {
		const sanitizedModelId = !FORECAST_MODELS[modelId as string] ? DEFAULT_FORECAST_MODEL : modelId
		const sanitizedSectorId = FORECAST_MODELS[sanitizedModelId as string].sectors.includes(sectorId as string)
			? sectorId
			: FORECAST_MODELS[sanitizedModelId as string].defaults.sector
		const productsByLevel = buildProductsByLevel(sanitizedModelId as string, sanitizedSectorId as string)

		// Level and Product have to be evaluated together - so everything below are steps to sanitize them
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
		const sanitizedParcelId = FORECAST_SOUNDING_PARCEL_OPTIONS[parcelId as string] ? parcelId : DEFAULT_FORECAST_SOUNDING_PARCEL
		const sanitizedWeatherId = FORECAST_SOUNDING_WEATHER_OPTIONS[weatherId as string] ? weatherId : DEFAULT_FORECAST_SOUNDING_WEATHER

		// Location need special handling as it can accept either station ID or lat,lon format
		let sanitizedLocationId = locationId
		if (isStationId) {
			sanitizedLocationId = await fetchStationCoordinates(locationId)
		} else if (locationId && locationId.includes(',') && locationId.split(',').length === 2) {
			const [lat, lon] = locationId.split(',')
			if (parseFloat(lat) < -90 || parseFloat(lat) > 90 || parseFloat(lon) < -180 || parseFloat(lon) > 180) {
				sanitizedLocationId = '0,0' // Default to 0,0 if coordinates are invalid
			}
		}

		if (
			sanitizedModelId !== modelId ||
			sanitizedSectorId !== sectorId ||
			sanitizedLevelId !== levelId ||
			sanitizedProductId !== productId ||
			sanitizedLocationId !== locationId ||
			sanitizedParcelId !== parcelId ||
			sanitizedWeatherId !== weatherId
		) {
			// If any of the sanitized parameters differ from the current ones, update the URL to manage state
			const baseParmsString = `${runId}/${sanitizedModelId}/${sanitizedSectorId}/${sanitizedLevelId}/${sanitizedProductId}`
			const soundingParmsString = `${validTimeId}/${sanitizedLocationId}/${sanitizedParcelId}/${sanitizedWeatherId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		}
		setInternalModelId(sanitizedModelId)
		setInternalLocationId(sanitizedLocationId)
		setInternalParcelId(sanitizedParcelId)
		setInternalWeatherId(sanitizedWeatherId)
		setAllowGenerateSounding(false) // Reset the generate button state
		setReturnLink(`/weather-data/forecast-models/${runId}/${sanitizedModelId}/${sanitizedSectorId}/${sanitizedLevelId}/${sanitizedProductId}`)
	}, [modelId, runId, sectorId, levelId, productId, validTimeId, locationId, parcelId, weatherId, isStationId, router])

	useEffect(() => {
		sanitizeCollectAndSetData()
	}, [runId, modelId, sectorId, levelId, productId, validTimeId, locationId, parcelId, weatherId, isStationId, sanitizeCollectAndSetData])

	const modelOptions = Object.keys(FORECAST_MODELS)
		.filter((model) => FORECAST_MODELS[model].allowForecastSounding === true)
		.map((model) => ({
			value: model,
			label: FORECAST_MODELS[model].name,
		}))

	const handleModelChange = (model: string) => {
		if (model !== internalModelId) {
			setInternalModelId(model)
			setAllowGenerateSounding(true)
		}
	}
	useEffect(() => {
		if (forecastSoundingRunId && forecastSoundingRunId !== runId) {
			// serves the same function as these other handlers, but specifically for the runId because it comes from the animator
			setAllowGenerateSounding(true)
		}
	}, [forecastSoundingRunId, runId])
	useEffect(() => {
		if (forecastSoundingValidTime && forecastSoundingValidTime !== validTimeId) {
			// serves the same function as these other handlers, but specifically for the validTimeId because it comes from the animator
			setAllowGenerateSounding(true)
		}
	}, [forecastSoundingValidTime, validTimeId])
	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value !== internalLocationId) {
			setInternalLocationId(e.target.value)
			setAllowGenerateSounding(true)
		}
	}
	const handleParcelChange = (parcel: string) => {
		if (parcel !== internalParcelId) {
			setInternalParcelId(parcel)
			setAllowGenerateSounding(true)
		}
	}
	const handleWeatherChange = (weather: string) => {
		if (weather !== internalWeatherId) {
			setInternalWeatherId(weather)
			setAllowGenerateSounding(true)
		}
	}
	const handleGenerateSounding = () => {
		if (
			allowGenerateSounding &&
			(internalModelId !== modelId ||
				forecastSoundingRunId !== runId ||
				forecastSoundingValidTime !== validTimeId ||
				internalLocationId !== locationId ||
				internalParcelId !== parcelId ||
				internalWeatherId !== weatherId)
		) {
			const baseParmsString = `${forecastSoundingRunId}/${internalModelId}/${sectorId}/${levelId}/${productId}`
			const soundingParmsString = `${forecastSoundingValidTime}/${internalLocationId}/${internalParcelId}/${internalWeatherId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		} else {
			alert(
				'Current parameters match existing sounding.\n\nChange any of the following:\nModel, Run, Location, Valid Time, Parcel Type, or Weather Type.',
			)
			setAllowGenerateSounding(false) // Reset the button state if no changes were made
		}
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastSoundingsSidebarPanel}>
				<SidebarSectionHeader name="Return to Forecast Models" linkUrl={returnLink} />
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
					<Input label="Location" value={internalLocationId} onChange={handleLocationChange} />
					<Select
						value={internalParcelId}
						placeholder={internalParcelId as string}
						title="Parcel Type:"
						options={Object.values(FORECAST_SOUNDING_PARCEL_OPTIONS).map((option) => ({
							value: option.id,
							label: option.label,
						}))}
						onChange={handleParcelChange}
					/>
					<Select
						value={internalWeatherId}
						placeholder={internalWeatherId as string}
						title="Weather Type:"
						options={Object.values(FORECAST_SOUNDING_WEATHER_OPTIONS).map((option) => ({
							value: option.id,
							label: option.label,
						}))}
						onChange={handleWeatherChange}
					/>
					<Button label="Generate Sounding" disabled={!allowGenerateSounding} onClick={handleGenerateSounding} />
				</div>
			</div>
		</ScrollArea>
	)
}

export default ForecastSoundingsSidebarPanel
