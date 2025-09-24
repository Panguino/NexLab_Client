'use client'

import Button from '@/components/elements/Button/Button'
import Input from '@/components/elements/Input/Input'
import Select from '@/components/elements/Select/Select'
import { FORECAST_MODELS } from '@/data/forecast/models'
import {
	DEFAULT_FORECAST_SOUNDING_PARCEL,
	DEFAULT_FORECAST_SOUNDING_WEATHER,
	FORECAST_SOUNDING_PARCEL_OPTIONS,
	FORECAST_SOUNDING_WEATHER_OPTIONS,
} from '@/data/forecast/soundingOptions'
import { useRootStore } from '@/store/useRootStore'
import { getForecastData } from '@/util/dataCalls/forecast/query-forecast'
import { findClosestValidTimeIndex } from '@/util/getClosestValidtime'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './ForecastSoundingPicker.module.scss'

interface ForecastSoundingPickerProps {
	modelId: string
	runId: string
	sectorId: string
	levelId: string
	productId: string
	validTimeId: string
	returnLink: string
	className?: string
}

const ForecastSoundingPicker = ({
	modelId,
	runId,
	sectorId,
	levelId,
	productId,
	validTimeId,
	returnLink,
	className,
}: ForecastSoundingPickerProps) => {
	const router = useRouter()
	const setSoundingPickerFrames = useRootStore.use.setSoundingPickerFrames()
	const setSoundingPickerImageInfo = useRootStore.use.setSoundingPickerImageInfo()
	const openSoundingPicker = useRootStore.use.openSoundingPicker()

	// Internal state for sounding parameters
	const [internalModelId, setInternalModelId] = useState(modelId)
	const [internalLocationId, setInternalLocationId] = useState('41.88,-87.63') // Default Chicago coordinates
	const [internalParcelId, setInternalParcelId] = useState(DEFAULT_FORECAST_SOUNDING_PARCEL)
	const [internalWeatherId, setInternalWeatherId] = useState(DEFAULT_FORECAST_SOUNDING_WEATHER)
	const [allowGenerateSounding, setAllowGenerateSounding] = useState(true)

	// Check if current model supports forecast sounding
	const modelSupportsForcastSounding = FORECAST_MODELS[modelId]?.allowForecastSounding === true

	// Only show picker if model supports forecast sounding
	if (!modelSupportsForcastSounding) {
		return null
	}

	// Get available models that support forecast sounding
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

	const handleLocationChange = useCallback((location: string) => {
		setInternalLocationId(location)
		setAllowGenerateSounding(true)
	}, [])

	const handleParcelChange = (parcel: string) => {
		setInternalParcelId(parcel)
		setAllowGenerateSounding(true)
	}

	const handleWeatherChange = (weather: string) => {
		setInternalWeatherId(weather)
		setAllowGenerateSounding(true)
	}

	const handleGenerateSounding = () => {
		if (allowGenerateSounding) {
			const baseParmsString = `${runId}/${internalModelId}/${sectorId}/${levelId}/${productId}`
			const soundingParmsString = `${validTimeId}/${internalLocationId}/${internalParcelId}/${internalWeatherId}`
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${soundingParmsString}`)
		} else {
			alert(
				'Current parameters match existing sounding.\n\nChange any of the following:\nModel, Run, Location, Valid Time, Parcel Type, or Weather Type.',
			)
			setAllowGenerateSounding(false)
		}
	}

	const handlePickOnMap = async () => {
		try {
			const data = await getForecastData(modelId, runId, sectorId, levelId, productId)
			const currentVT = validTimeId || data.validtimes[data.validtimes.length - 1]
			const index = findClosestValidTimeIndex(data.validtimes, currentVT)
			setSoundingPickerFrames([data.frames[index]])
			setSoundingPickerImageInfo(data.imageInfo)
			openSoundingPicker()
		} catch (e) {
			console.error('Failed to open sounding picker', e)
		}
	}

	return (
		<div className={`${styles.forecastSoundingPicker} ${className || ''}`}>
			<div className={styles.soundingSection}>
				<div className={styles.soundingSectionHeader}>
					<h3>Forecast Sounding</h3>
					<p>Generate atmospheric soundings for supported models</p>
				</div>
				<div className={styles.options}>
					<label>Model:</label>
					<Select
						value={internalModelId}
						placeholder={internalModelId}
						options={modelOptions}
						onChange={handleModelChange}
					/>
					<label>Location:</label>
					<div className={styles.locationWithPicker}>
						<Input value={internalLocationId} onChange={handleLocationChange} />
						<button className={styles.pickButton} title="Pick on map" onClick={handlePickOnMap}>
							📍
						</button>
					</div>
					<label>Parcel Type:</label>
					<Select
						value={internalParcelId}
						placeholder={internalParcelId}
						options={FORECAST_SOUNDING_PARCEL_OPTIONS}
						onChange={handleParcelChange}
					/>
					<label>Weather Type:</label>
					<Select
						value={internalWeatherId}
						placeholder={internalWeatherId}
						options={FORECAST_SOUNDING_WEATHER_OPTIONS}
						onChange={handleWeatherChange}
					/>
					<Button label="Generate Sounding" disabled={!allowGenerateSounding} onClick={handleGenerateSounding} />
				</div>
			</div>
		</div>
	)
}

export default ForecastSoundingPicker
