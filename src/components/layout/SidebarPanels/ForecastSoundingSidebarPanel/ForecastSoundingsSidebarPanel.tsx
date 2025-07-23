'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
import { FORECAST_SECTORS } from '@/data/forecast/sectors'
import { buildProductsByLevel, fetchStationCoordinates } from '@/util/forecast/common-functions'
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
	const decodedLocationId = tempLocId ? decodeURIComponent(tempLocId as string) : null
	const isStationId = decodedLocationId?.length === 4 && !decodedLocationId?.includes(',')
	const router = useRouter()

	const [locationId, setLocationId] = useState(decodedLocationId)
	const [isLoading, setIsLoading] = useState(isStationId)
	const [error, setError] = useState(null)
	const [regionId, setRegionId] = useState('')
	const [sortedProductEntries, setSortedProductEntries] = useState([])
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
		// Only fetch if this is a station ID
		if (isStationId && decodedLocationId) {
			setIsLoading(true)

			// Using our utility function
			fetchStationCoordinates(decodedLocationId)
				.then((coordinates) => {
					setLocationId(coordinates)
				})
				.catch((err) => {
					console.error('Error fetching station data:', err)
					setError(err.message)
					setLocationId(decodedLocationId) // Fallback to station ID
				})
				.finally(() => {
					setIsLoading(false)
				})
		} else {
			setLocationId(decodedLocationId)
		}
	}, [decodedLocationId, isStationId])

	useEffect(() => {
		openIndexRef.current = openIndex
	}, [openIndex])

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index) // Close if already open, otherwise open the clicked accordion
	}

	return (
		<ScrollArea>
			<div className={styles.ForecastSoundingsSidebarPanel}>
				Parameters:
				{isLoading ? (
					<p>Loading station coordinates...</p>
				) : (
					<>
						{modelId && <p>Model ID: {modelId}</p>}
						{runId && <p>Run ID: {runId}</p>}
						{validTimeId && <p>Valid Time ID: {validTimeId}</p>}
						{locationId && <p>Location: {locationId}</p>}
						{parcelId && <p>Parcel ID: {parcelId}</p>}
						{weatherId && <p>Weather ID: {weatherId}</p>}
						{error && <p className={styles.error}>Error: {error}</p>}
						<p>
							<strong>For Map Generation:</strong>
						</p>
						{sectorId && <p>Sector ID: {sectorId}</p>}
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
											onClick={() =>
												router.push(`/weather-data/forecast-models/${runId}/${modelId}/${sectorId}/${level}/${product}`)
											}
										/>
									))}
								</div>
							</Accordian>
						))}
					</>
				)}
			</div>
		</ScrollArea>
	)
}

export default ForecastSoundingsSidebarPanel
