'use client'

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { FORECAST_LEVELS } from '@/data/forecast/levels'
import { DEFAULT_FORECAST_MODEL, FORECAST_MODELS } from '@/data/forecast/models'
import { FORECAST_PRODUCTS } from '@/data/forecast/products'
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
	const router = useRouter()
	// sounding location prep
	const decodedLocationId = tempLocId ? decodeURIComponent(tempLocId as string) : null
	const isStationId = decodedLocationId?.length === 4 && !decodedLocationId?.includes(',')
	const [locationId, setLocationId] = useState(decodedLocationId)
	const [isLoading, setIsLoading] = useState(isStationId)
	const [error, setError] = useState(null)

	// menu prep
	const [sortedProductEntries, setSortedProductEntries] = useState([])
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const openIndexRef = useRef<number | null>(null)

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
		if (productsByLevel.find((item) => item.level === levelId && item.products.includes(productId))) {
			// product exists for the level
			sanitizedLevelId = levelId
			sanitizedProductId = productId
		} else if (productsByLevel.some((item) => item.products.includes(productId))) {
			// product exists for some level just not the one requested
			sanitizedLevelId = productsByLevel.find((item) => item.products.includes(productId))?.level
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
			router.push(`/weather-data/forecast-models/${baseParmsString}/sounding/${validTimeId}/${locationId}/${parcelId}/${weatherId}`)
		} else {
			const levelIndex = productsByLevel.findIndex((item) => item.level === levelId)
			if (openIndexRef.current !== levelIndex) {
				setOpenIndex(levelIndex)
			}
			setSortedProductEntries(productsByLevel)
		}
	}, [runId, modelId, sectorId, levelId, productId, router, validTimeId, locationId, parcelId, weatherId])

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
				Parameters sidebar branch:
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
					</>
				)}
			</div>
		</ScrollArea>
	)
}

export default ForecastSoundingsSidebarPanel
